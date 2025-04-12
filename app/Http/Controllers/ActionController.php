<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\ActionsType;
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
        // Validate incoming data
        $validatedData = $request->validate([
            'action' => 'required|integer|exists:actions_types,id',
            'payment' => 'nullable|integer',
        ]);

        // Prepare the data for the actions table
        $data = [
            'patient_id' => $patientId,
            'actions_types_id' => $validatedData['action'], // Lowercase
            'payment' => $validatedData['payment'] ?? 0, // Default to 0 if no payment is provided
            'created_by' => auth()->id(),
            'updated_by' => auth()->id(),
        ];

        // Insert the new action record
        $action = Action::create($data);

        // Find the patient and update the status if necessary
        $patient = Patient::findOrFail($patientId);

        if ($patient->status) {
            $patient->status = false;
            $patient->save();
        }

        // Redirect to the Patients creation route
        return to_route('Patients.create')->with('success', 'Action successfully created.');
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
        $actionsTypes = ActionsType::all();
        return response()->json([$action, $actionsTypes]);
    }

    /**
     * 
     * switch the status of a patient
     * 
     */
    public function changeStatus(Request $request, $actionId)
    {
        // Validate the input
        $validated = $request->validate([
            'status' => 'required|boolean',
        ]);

        // Find the Action model by ID
        $action = Action::findOrFail($actionId);

        // Update the status field on the Action model
        $action->Status = $validated['status'];

        // Optionally, store who updated the action
        $action->updated_by = auth()->id();

        // Save the changes
        $action->save();

        // Return a success message
        return back()->with('success', 'Action status updated successfully!');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $actionId)
    {
        // Cast the 'action' parameter to an integer before validation
        $request->merge([
            'actions_types_id' => (int) $request->input('action')
        ]);

        // Validate the incoming request data
        $validatedData = $request->validate([
            'actions_types_id' => 'required|integer|exists:actions_types,id', // Ensure the action type ID is valid
            'payment' => 'nullable|integer',
        ]);

        // Find the action by its ID or fail if not found
        $action = Action::findOrFail($actionId);

        // Update the action with the validated data
        $action->actions_types_id = $validatedData['actions_types_id'];
        $action->payment = $validatedData['payment'];
        $action->updated_by = auth()->id();

        // Save the changes to the database
        $action->save();

        // Redirect back with a success message
        return back()->with('success', 'Action updated successfully!');
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
