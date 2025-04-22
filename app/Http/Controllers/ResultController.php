<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Action_LabResults;
use App\Models\Action_Medications;
use Illuminate\Http\Request;
use App\Models\Action_Scanners;
use App\Models\check_up;
use App\Models\LabResult;
use App\Models\Medication;
use App\Models\Note;
use App\Models\Result;
use App\Models\Scanner;

class ResultController extends Controller
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
            'action_id' => 'required|numeric',
            'scans' => 'nullable|array',
            'labResults' => 'nullable|array',
            'medications' => 'nullable|array',
            'note' => 'nullable|string',
            'check_up' => 'nullable|array'
        ]);

        $action_id = $validatedData['action_id'];
        $user_id = auth()->id();

        if (!empty($validatedData['scans'])) {
            foreach ($validatedData['scans'] as $scan_id) {
                Action_Scanners::create([
                    'action_id' => $action_id,
                    'scanner_id' => $scan_id
                ]);
            }
        }

        if (!empty($validatedData['labResults'])) {
            foreach ($validatedData['labResults'] as $lab_result_id) {
                Action_LabResults::create([
                    'action_id' => $action_id,
                    'lab_result_id' => $lab_result_id
                ]);
            }
        }

        if (!empty($validatedData['medications'])) {
            foreach ($validatedData['medications'] as $medication_id) {
                Action_Medications::create([
                    'action_id' => $action_id,
                    'medication_id' => $medication_id
                ]);
            }
        }

        if (!empty($validatedData['check_up'])) {
            foreach ($validatedData['check_up'] as $check_up_id) {
                Result::create([
                    'check_up_id' => $check_up_id,
                    'action_id' => $action_id,
                    'created_by' => $user_id
                ]);
            }
        }

        Note::create([
            'note' => $validatedData['note'],
            'action_id' => $action_id,
        ]);

        return to_route('Patients.create')->with('success', 'the check up completed with success');
    }

    /**
     * Display the specified resource.
     */
    public function show($action_id)
    {
        $patient = Action::with([
            'patient',    
            'createdBy',  
            'updatedBy',  
        ])
        ->findOrFail($action_id);


        $action_scanners = Action_Scanners::with('scanner')
        ->where('action_id', $action_id)
        ->get();
        $action_medication = Action_Medications::with('medication')
        ->where('action_id', $action_id)
        ->get();
        $action_lab_results = Action_LabResults::with('labResult')
        ->where('action_id', $action_id)
        ->get();
        $action_chesk_ups =  Result::with('check_up')
        ->where('action_id', $action_id)
        ->get();

        $medications = Medication::orderBy('medication')->get();
        $scanners = Scanner::orderBy('scan')->get();
        $lab_results = LabResult::orderBy('lab_results')->get();
        $check_ups = check_up::orderBy('check_up')->get();


        return inertia('Patients/CheckUp', [
            'patient' => $patient,
            'medications' => $medications,
            'scanners' => $scanners,
            'lab_results' => $lab_results,
            'check_ups' => $check_ups,
            'action_scanners' => $action_scanners,
            'action_medication' => $action_medication,
            'action_lab_results' => $action_lab_results,
            'action_chesk_ups' => $action_chesk_ups,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Result $result)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Result $result)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Result $result)
    {
        //
    }
}
