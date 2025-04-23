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
        $note = Note::where('action_id', $action_id)
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
            'note' => $note,
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
        // Validate the incoming request data
        $validatedData = $request->validate([
            'action_id' => 'required|numeric',
            'deleteScans' => 'nullable|array',
            'updateScans' => 'nullable|array',
            'insertScans' => 'nullable|array',
            'deleteLabResults' => 'nullable|array',
            'updateLabResults' => 'nullable|array',
            'insertLabResults' => 'nullable|array',
            'deleteMedication' => 'nullable|array',
            'updateMedication' => 'nullable|array',
            'insertMedication' => 'nullable|array',
            'deleteCheckUps' => 'nullable|array',
            'updateCheckUps' => 'nullable|array',
            'insertCheckUps' => 'nullable|array',
            'Notes' => 'nullable|string',
        ]);
    
        $action_id = $validatedData['action_id'];
        $user_id = auth()->id();
    
        // Handle Delete Operations
        if (!empty($validatedData['deleteScans'])) {
            Action_Scanners::whereIn('action_id', $validatedData['deleteScans'])->delete();
        }
    
        if (!empty($validatedData['deleteLabResults'])) {
            Action_LabResults::whereIn('action_id', $validatedData['deleteLabResults'])->delete();
        }
    
        if (!empty($validatedData['deleteMedication'])) {
            Action_Medications::whereIn('action_id', $validatedData['deleteMedication'])->delete();
        }
    
        if (!empty($validatedData['deleteCheckUps'])) {
            Result::whereIn('action_id', $validatedData['deleteCheckUps'])->delete();
        }
    
        // Handle Update Operations
        if (!empty($validatedData['updateScans'])) {
            foreach ($validatedData['updateScans'] as $updateScan) {
                Action_Scanners::where('action_id', $updateScan['action_id'])
                    ->where('scanner_id', $updateScan['scanner_id'])
                    ->update(['scanner_id' => $updateScan['new_scanner_id']]);
            }
        }
    
        if (!empty($validatedData['updateLabResults'])) {
            foreach ($validatedData['updateLabResults'] as $updateLabResult) {
                Action_LabResults::where('action_id', $updateLabResult['action_id'])
                    ->where('lab_result_id', $updateLabResult['lab_result_id'])
                    ->update(['lab_result_id' => $updateLabResult['new_lab_result_id']]);
            }
        }
    
        if (!empty($validatedData['updateMedication'])) {
            foreach ($validatedData['updateMedication'] as $updateMedication) {
                Action_Medications::where('action_id', $updateMedication['action_id'])
                    ->where('medication_id', $updateMedication['medication_id'])
                    ->update(['medication_id' => $updateMedication['new_medication_id']]);
            }
        }
    
        if (!empty($validatedData['updateCheckUps'])) {
            foreach ($validatedData['updateCheckUps'] as $updateCheckUp) {
                Result::where('action_id', $updateCheckUp['action_id'])
                    ->where('check_up_id', $updateCheckUp['check_up_id'])
                    ->update(['check_up_id' => $updateCheckUp['new_check_up_id']]);
            }
        }
    
        // Handle Insert Operations
        if (!empty($validatedData['insertScans'])) {
            foreach ($validatedData['insertScans'] as $scan_id) {
                Action_Scanners::create([
                    'action_id' => $action_id,
                    'scanner_id' => $scan_id,
                ]);
            }
        }
    
        if (!empty($validatedData['insertLabResults'])) {
            foreach ($validatedData['insertLabResults'] as $lab_result_id) {
                Action_LabResults::create([
                    'action_id' => $action_id,
                    'lab_result_id' => $lab_result_id,
                ]);
            }
        }
    
        if (!empty($validatedData['insertMedication'])) {
            foreach ($validatedData['insertMedication'] as $medication_id) {
                Action_Medications::create([
                    'action_id' => $action_id,
                    'medication_id' => $medication_id,
                ]);
            }
        }
    
        if (!empty($validatedData['insertCheckUps'])) {
            foreach ($validatedData['insertCheckUps'] as $check_up_id) {
                Result::create([
                    'check_up_id' => $check_up_id,
                    'action_id' => $action_id,
                    'created_by' => $user_id,
                ]);
            }
        }
    
        // Handle Notes
        if (isset($validatedData['Notes'])) {
            Note::updateOrCreate(
                ['action_id' => $action_id],
                ['note' => $validatedData['Notes']]
            );
        }
    
        // Return a success response
        return to_route('Patients.create')->with('success', 'The check-up was updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Result $result)
    {
        //
    }
}
