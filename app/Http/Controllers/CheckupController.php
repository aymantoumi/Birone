<?php

namespace App\Http\Controllers;

use App\Models\Action_LabResults;
use App\Models\Action_Medications;
use Illuminate\Http\Request;
use App\Models\Action_Scanners;
use App\Models\Note;
use App\Models\Result;

class CheckupController extends Controller
{
    /**
     * Store a new checkup record.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'action_id' => 'required|numeric',
            'scans' => 'nullable|array', 
            'labResults' => 'nullable|array', 
            'medications' => 'nullable|array', 
            'note' => 'nullable|string',
            'check_up' => 'required|string|min:10' 
        ]);

        $action_id = $validatedData['action_id'];
        $user_id = auth()->id();

        if (!empty($validatedData['scans']))
        {
            foreach ($validatedData['scans'] as $scan_id)
            {
                Action_Scanners::create([
                    'action_id' => $action_id,
                    'scanner_id' => $scan_id
                ]);
            }
        }

        if (!empty($validatedData['labResults']))
        {
            foreach ($validatedData['labResults'] as $lab_result_id)
            {
                Action_LabResults::create([
                    'action_id' => $action_id,
                    'lab_result_id' => $lab_result_id
                ]);
            }
        }
        
        if (!empty($validatedData['medications']))
        {
            foreach ($validatedData['medications'] as $medication_id)
            {
                Action_Medications::create([
                    'action_id' => $action_id,
                    'medication_id' => $medication_id
                ]);
            }
        }
        
        Result::create([
            'results' => $validatedData['check_up'],
            'action_id' => $action_id,
            'created_by' => $user_id
        ]);

        Note::create([
            'note' => $validatedData['note'],
            'action_id' => $action_id,
        ]);

        return to_route('Patients.create')->with('success', 'the check up completed with success');

    }

    /**
     * Update an existing checkup record.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $actionId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $actionId)
    {
       
    }
}