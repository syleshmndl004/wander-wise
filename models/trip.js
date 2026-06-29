import { Schema, model } from "mongoose";

const ExpenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const BudgetSchema = new Schema({
  total: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    default: 0,
  },
  expenses: [ExpenseSchema],
});

const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  destinations: {
    type: [String],
    required: true,
    trim: true,
  },
  budget: BudgetSchema,
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

TripSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();

  const expenses = update?.budget?.expenses;

  if (expenses?.length) {
    update.budget.spent =
      (update.budget.spent || 0) +
      (expenses.reduce((acc, expense) => acc + expense.amount, 0) || 0);

    expenses.forEach((expense) => {
      expense.date = new Date();
    });
  }
});

const Trip = model("Trip", TripSchema);

export default Trip;