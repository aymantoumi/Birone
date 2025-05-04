<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;

class ActionResultController extends Controller
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
        //
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
            'check_up' => 'required|numeric|exists:check_ups,id'
        ]);

        $action_result = Result::findOrFail($id);

        $action_result->update([
            'check_up_id' => $validateData['check_up']
        ]);

        return redirect()->back()->with('success', 'Check up updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $action_result = Result::find($id);

        if ($action_result) {
            $action_result->delete();
            return ;
        } else {
            return back()->with('error', 'Couldn\'t be found');
        }
    }
}
