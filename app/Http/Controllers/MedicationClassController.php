<?php

namespace App\Http\Controllers;

use App\Models\MedicationClass;
use Illuminate\Http\Request;

class MedicationClassController extends Controller
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
        $validateData = $request->validate([
            'medication_class' => 'required|string|min:10|max:120' 
        ]);
    
        MedicationClass::create($validateData);
    
        return to_route('settings.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(MedicationClass $medicationClass)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MedicationClass $medicationClass)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $medicationClassId)
    {
        $validatedData = $request->validate([
            'medication_class' => 'required|string|min:10|max:120', 
        ]);
    
        $medicationClass = MedicationClass::findOrFail($medicationClassId);
        $medicationClass->medication_class = $validatedData['medication_class'];
    
        $medicationClass->save();
    
        return back()->with('success', 'Medication class updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $medicationClass = MedicationClass::find($id);
    
        if ($medicationClass) {
            $medicationClass->delete();
            return back()->with('success', 'Medication class deleted successfully!');
        } else {
            return back()->with('error', 'Medication class not found.');
        }
    }
}
