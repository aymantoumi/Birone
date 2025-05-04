<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;

class ActionCheckupController extends Controller
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
            'check_up' => 'required|numeric|exists:check_ups,id',
            'actionId' => 'required|numeric|exists:actions,id'
        ]);
        $user_id = auth()->id();

        Result::create([
            'check_up_id' => $validatedData['check_up'],
            'action_id' => $validatedData['actionId'],
            'created_by' => $user_id,
            'updated_by' => $user_id,
        ]);
    
        return back()->with('success', 'Check-up result added successfully!');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
