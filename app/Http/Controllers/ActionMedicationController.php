<?php

namespace App\Http\Controllers;

use App\Models\Action_Medications;
use Illuminate\Http\Request;

class ActionMedicationController extends Controller
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
            'medication' => 'required|numeric|exists:medications,id',
            'actionId' => 'required|numeric|exists:actions,id'
        ]);

        Action_Medications::create([
            'medication_id' => $validatedData['medication'],
            'action_id' => $validatedData['actionId'],
        ]);

        return back()->with('success', 'Medication added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'medication' => 'required|numeric|exists:medications,id'
        ]);

        $action_medication = Action_Medications::findOrFail($id);
        
        $action_medication->update([
            'medication_id' => $validatedData['medication']
        ]);

        return redirect()->back()->with('success', 'Medication updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $action_medication = Action_Medications::find($id);

        if ($action_medication) {
            $action_medication->delete();
            return;
        } else {
            return back()->with('error', 'Couldn\'t be found');
        }
    }
}
