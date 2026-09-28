import { Router } from "express";
import {
  create,
  find,
  index,
  remove,
  update,
} from "../services/itinerary.js";
import {
  createItineraryValidator,
  updateItineraryValidator,
} from "../validators/itinerary.js";

const router = Router({ mergeParams: true });

router.post("/", createItineraryValidator, async (req, res, next) => {
  try {
    const itinerary = await create({
      ...req.body,
      trip: req.params.tripId,
      user: req.user,
    });
    res.status(201).json(itinerary);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const itineraries = await index(req.params.tripId, req.user);
    res.status(200).json(itineraries);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const itinerary = await find(req.params.id, req.params.tripId, req.user);
    res.status(200).json(itinerary);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", updateItineraryValidator, async (req, res, next) => {
  try {
    const itinerary = await update(
      req.params.id,
      req.params.tripId,
      req.user,
      req.body,
    );
    res.status(200).json(itinerary);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const itinerary = await remove(req.params.id, req.params.tripId, req.user);
    res.status(200).json(itinerary);
  } catch (error) {
    next(error);
  }
});

export default router;
