<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Patient;
use Illuminate\Http\Request;

class ActionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Implement logic to list actions if needed
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Implement logic to show form for creating a new action if needed
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $patientId)
    {
        $validatedData = $request->validate([
            'action' => 'required|string',
            'payment' => 'required|numeric',
        ]);

        // Add the user ID to the validated data
        $validatedData['patient_id'] = $patientId;
        $validatedData['created_by'] = auth()->id(); 
        $validatedData['updated_by'] = auth()->id(); 

        // Create the action
        $action = Action::create($validatedData);

        // Find the patient and update the status if necessary
        $patient = Patient::findOrFail($patientId);

        if ($patient->status) {
            $patient->status = false;
            $patient->save();
        }

        // Redirect to the Patients creation route
        return to_route('Patients.create');
    }


    /**
     * Display the specified resource.
     */
    public function show(Action $action)
    {
        // Implement logic to display a specific action if needed
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($actionId)
    {
        $action = Action::findOrFail($actionId);
        return response()->json($action);
    }

    /**
     * 
     * switch the status of a patient
     * 
     */
    public function changeStatus(Request $request, $actionId)
    {
        $validated = $request->validate([
            'status' => 'required|boolean',
        ]);

        $patient = Action::findOrFail($actionId);
        $patient->Status = $validated['status'];
        $validatedData['updated_by'] = auth()->id(); 

        $patient->save();

        return back()->with('success', 'Patient status updated successfully!');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $actionId)
    {
        logger()->info('Request Data: ', $request->all());
    
        $validatedData = $request->validate([
            'action' => 'required|string',
            'payment' => 'required|numeric',
        ]);
    
        $validatedData['updated_by'] = auth()->id(); 
    
        $action = Action::findOrFail($actionId);
        $action->update($validatedData);
    
        return redirect()->back()->with('success', 'Action updated successfully!');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Action $action)
    {
        $action->delete();
        return redirect()->back()->with('success', 'Action deleted successfully!');
    }
}
