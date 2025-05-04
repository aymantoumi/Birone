<?php

namespace App\Http\Controllers;

use App\Models\Action_Scanners;
use Illuminate\Http\Request;

class ActionScannersController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'scanner' => 'required|numeric|exists:scanners,id',
            'actionId' => 'required|numeric|exists:actions,id'
        ]);

        Action_Scanners::create([
            'scanner_id' => $validatedData['scanner'],
            'action_id' => $validatedData['actionId'],
        ]);

        return back()->with('success', 'Scanner added successfully!');
    }
    
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'ct_scans' => 'required|numeric|exists:scanners,id',
        ]);

        $action_scan = Action_Scanners::findOrFail($id);

        $action_scan->update([
            'scanner_id' => $validated['ct_scans']
        ]);

        return;
    }

    public function destroy($id)
    {
        $action_scan = Action_Scanners::find($id);

        if ($action_scan) {
            $action_scan->delete();
            return redirect()->back();
        }

        return back()->with('error', 'Couldn\'t be found');
    }
}
