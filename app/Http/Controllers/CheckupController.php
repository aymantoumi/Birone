<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\check_up;

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
            'check_up' => 'required|string|min:5'
        ]);

        check_up::create([
            'check_up' => $validatedData['check_up'],
        ]);

        return back()->with('success', 'Medication class deleted successfully!');
    }

    /**
     * Update an existing checkup record.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $actionId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, check_up $check_up)
    {
       $validatedData = $request->validate([
        'check_up' => 'required|string|min:5|max:500',
       ]);

       $check_up->update($validatedData);

       return back()->with('success', 'Check Up updated successfully.');
    }

    public function destroy($id)
    {
        $check_up = check_up::find($id);

        if ($check_up) {
            $check_up->delete();
            return back()->with('success', 'check_up deleted successfully!');
        } else {
            return back()->with('error', 'check_up not found.');
        }
    }
}