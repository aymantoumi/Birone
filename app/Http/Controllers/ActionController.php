<?php

namespace App\Http\Controllers;

use App\Models\action;
use App\Models\Patient;
use Illuminate\Http\Request;

class ActionController extends Controller
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
    public function store(Request $request, $patientId)
    {

        $validatedData = $request->validate([
            'action' => 'required|string',
            'payment' => 'required|numeric',
        ]);
        logger()->info('Validated Data: ', $validatedData);

        $validatedData['patient_id'] = $patientId;

        $action = Action::create($validatedData);

        return redirect()->back()->with('success', 'Action added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(action $action)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(action $action)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $patientId, $actionId)
    {
        $validatedData = $request->validate([
            'Action' => 'required|string',
            'Payment' => 'required|numeric',
        ]);

        $action = Action::where('id', $actionId)->where('Patient_ID', $patientId)->firstOrFail();
        $action->update($validatedData);

        return redirect()->route('patients.show', $patientId)->with('success', 'Action updated successfully!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(action $action)
    {
        //
    }
}
