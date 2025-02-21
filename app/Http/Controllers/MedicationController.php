<?php

namespace App\Http\Controllers;

use App\Models\Medication;
use Illuminate\Http\Request;

class MedicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'medication' => 'required|string|max:255',
            'medication_class_id' => 'required|exists:medication_classes,id',
        ]);
    
        Medication::create([
            'medication' => $validatedData['medication'],
            'medication_class_id' => $validatedData['medication_class_id'], // Correct key
        ]);
    
        return redirect()->route('medications.index')->with('success', 'Medication added successfully.');
    }
    /**
     * Display the specified resource.
     */
    public function show(Medication $medication)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Medication $medication)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $medicationId)
    {
        $validatedData = $request->validate([
            'medication' => 'required|string|max:255',
            'medication_class_id' => 'required|exists:medication_classes,id',
        ]);

        $medication = Medication::findOrFail($medicationId);
        $medication->medication = $validatedData['medication'];
        $medication->medication_class_id = $validatedData['medication_class_id'];

        $medication->save();

        return back()->with('success', 'Medication updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $medication = Medication::find($id);

        if ($medication) {
            $medication->delete();
            return back()->with('success', 'Medication deleted successfully!');
        } else {
            return back()->with('error', 'Medication not found.');
        }
    }
}
