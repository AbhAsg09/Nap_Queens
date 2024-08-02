import { Request, Response } from 'express';
import Person from '../models/Person';

// Function to handle registering an entry
export const registerEntry = async (req: Request, res: Response) => {
  try {
    const { id, name, entryGate } = req.body;
    const exitGate = null;

    // Check if a person with the same ID already exists
    const existingPerson = await Person.findOne({ id });
    if (existingPerson) {
      return res.status(400).json({ error: 'Person with this ID already exists' });
    }


    // Create a new entry record
    const person = new Person({ id, name, entryGate, exitGate: exitGate,  timestamp: new Date() });
    await person.save();

    res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle registering an exit
export const registerExit = async (req: Request, res: Response) => {
  try {
    const { id, name, exitGate } = req.body;

    // Find the person's entry record
    const person = await Person.findOne({ id, name, exitGate: null });

    if (!person) {
      return res.status(404).json({ error: 'Person not found or already exited' });
    }

    // Update the record with the exit information
    person.exitGate = exitGate;
    person.timestamp = new Date();
    await person.save();

    res.status(200).json({ message: 'Exit recorded successfully', person });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPeopleInside = async (req: Request, res: Response) => {
    try {
      // Find all people who have entered but not exited
      const peopleInside = await Person.find({ exitGate: null });
  
      res.status(200).json(peopleInside);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Function to get people by date
export const getPeopleByDate = async (req: Request, res: Response) => {
  try {
    const { dates } = req.body;
    if (!dates || !Array.isArray(dates)) {
      return res.status(400).json({ error: 'Dates array is required' });
    }

    const people = await Person.find({
      $expr: {
        $in: [{ $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, dates]
      }
    });

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
