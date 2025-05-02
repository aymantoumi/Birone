<?php

namespace App\Http\Controllers;

use App\Models\Action_Scanners;
use Illuminate\Http\Request;

class ActionScannersController extends Controller
{
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
