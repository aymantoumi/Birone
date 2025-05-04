<?php

namespace App\Http\Controllers;

use App\Models\Action_LabResults;
use Illuminate\Http\Request;

class ActionLabResultController extends Controller
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
            'lab_result' => 'required|numeric|exists:lab_results,id',
            'actionId' => 'required|numeric|exists:actions,id'
        ]);
    
        Action_LabResults::create([
            'lab_result_id' => $validatedData['lab_result'],
            'action_id' => $validatedData['actionId'],
        ]);
    
        return back()->with('success', 'Lab result added successfully!');
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
        $validateData = $request->validate([
            'lab_result' => 'required|numeric|exists:action__lab_results,id'
        ]);

        $action_lab_result = Action_LabResults::findOrFail($id);

        $action_lab_result->update([
            'lab_result_id' => $validateData['lab_result']
        ]);

        return redirect()->back()->with('success', 'Medication updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $action_lab_result = Action_LabResults::find($id);

        if ($action_lab_result)
        {
            $action_lab_result->delete();
        }
        else {
            return back()->with('error', 'Couldn\'t be found');
        }
    }
}
