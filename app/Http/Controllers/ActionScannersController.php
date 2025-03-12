<?php

namespace App\Http\Controllers;

use App\Models\Action_Scanners;
use Illuminate\Http\Request;

class ActionScannersController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'action_id' => 'required|exists:actions,id',
            'selectedScans' => 'array',
            'selectedScans.*' => 'nullable|exists:scanners,id',
        ]);

        // Extract validated data
        $actionId = $validated['action_id'];
        $selectedScans = $validated['selectedScans'] ?? [];

        // Retrieve existing records for the given action_id
        $existingRecords = Action_Scanners::where('action_id', $actionId)->pluck('scanner_id')->toArray();

        // Determine which scanners to create or delete
        $scannersToAdd = array_diff($selectedScans, $existingRecords);
        $scannersToRemove = array_diff($existingRecords, $selectedScans);

        // Create new records for added scanners
        foreach ($scannersToAdd as $scannerId) {
            Action_Scanners::create([
                'action_id' => $actionId,
                'scanner_id' => $scannerId,
            ]);
        }

        // Delete records for removed scanners
        Action_Scanners::whereIn('scanner_id', $scannersToRemove)
            ->where('action_id', $actionId)
            ->delete();

        // Return success response
        return response()->json([
            'message' => 'Scanners updated successfully.',
            'action_id' => $actionId,
            'scanners' => Action_Scanners::where('action_id', $actionId)->get(),
        ], 200);
    }
}
