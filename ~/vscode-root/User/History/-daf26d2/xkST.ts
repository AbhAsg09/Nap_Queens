import { Request, Response } from 'express';
import Person from '../models/Person';

// Function to handle registering an entry
export const registerEntry = async (req: Request, res: Response) => {
  try {
    const { id, name, entryGate } = req.body;
    const exitGate = null;
    const entryDate = new Date().toLocaleDateString('en-GB'); // format: dd/mm/yyyy
    const entryTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // format: hh:mm

    // Check if a person with the same ID already exists
    const existingPerson = await Person.findOne({ id });
    if (existingPerson) {
      return res.status(400).json({ error: 'Person with this ID already exists' });
    }

    // Create a new entry record
    const person = new Person({ id, name, entryGate, exitGate, entryDate, entryTime });
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
    const exitDate = new Date().toLocaleDateString('en-GB'); // format: dd/mm/yyyy
    const exitTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // format: hh:mm

    // Find the person's entry record
    const person = await Person.findOne({ id, name, exitGate: null });

    if (!person) {
      return res.status(404).json({ error: 'Person not found or already exited' });
    }

    // Update the record with the exit information
    person.exitGate = exitGate;
    person.exitDate = exitDate;
    person.exitTime = exitTime;
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
    const { date } = req.body;
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    const people = await Person.find({
      $or: [
        { entryDate: date },
        { exitDate: date }
      ]
    });

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};