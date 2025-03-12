<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Action;
use App\Models\Result;
use App\Models\Note;
use Illuminate\Support\Facades\DB;

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
        dd($request);
        // Begin database transaction
        DB::beginTransaction();

        try {
            // Validate incoming data
            $validated = $request->validate([
                'action_id' => 'required|integer|exists:actions,id',
                'medication_ids' => 'nullable|array',
                'scanner_ids' => 'nullable|array',
                'lab_result_ids' => 'nullable|array',
                'result' => 'nullable|string',
                'notes' => 'nullable|string',
            ]);

            // Find the Action record
            $action = Action::findOrFail($validated['action_id']);

            // Sync Medications (if provided)
            if (isset($validated['medication_ids'])) {
                $action->medications()->sync($validated['medication_ids']);
            }

            // Sync Scanners (if provided)
            if (isset($validated['scanner_ids'])) {
                $action->scanners()->sync($validated['scanner_ids']);
            }

            // Sync Lab Results (if provided)
            if (isset($validated['lab_result_ids'])) {
                $action->labResults()->sync($validated['lab_result_ids']);
            }

            // Update Result (if provided)
            if (isset($validated['result'])) {
                $result = Result::firstOrNew(['action_id' => $action->id]);
                $result->results = $validated['result'];
                $result->save();
            }

            // Update Notes (if provided)
            if (isset($validated['notes'])) {
                $note = Note::firstOrNew(['action_id' => $action->id]);
                $note->note = $validated['notes'];
                $note->save();
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Checkup data saved successfully'], 201);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
        // Begin database transaction
        DB::beginTransaction();

        try {
            // Validate incoming data
            $validated = $request->validate([
                'medication_ids' => 'nullable|array',
                'scanner_ids' => 'nullable|array',
                'lab_result_ids' => 'nullable|array',
                'result' => 'nullable|string',
                'notes' => 'nullable|string',
            ]);

            // Find the Action record
            $action = Action::findOrFail($actionId);

            // Sync Medications (if provided)
            if (isset($validated['medication_ids'])) {
                $action->medications()->sync($validated['medication_ids']);
            }

            // Sync Scanners (if provided)
            if (isset($validated['scanner_ids'])) {
                $action->scanners()->sync($validated['scanner_ids']);
            }

            // Sync Lab Results (if provided)
            if (isset($validated['lab_result_ids'])) {
                $action->labResults()->sync($validated['lab_result_ids']);
            }

            // Update Result (if provided)
            if (isset($validated['result'])) {
                $result = Result::firstOrNew(['action_id' => $action->id]);
                $result->results = $validated['result'];
                $result->save();
            }

            // Update Notes (if provided)
            if (isset($validated['notes'])) {
                $note = Note::firstOrNew(['action_id' => $action->id]);
                $note->note = $validated['notes'];
                $note->save();
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Checkup data updated successfully'], 200);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}