<?php

namespace App\Http\Controllers;

use App\Models\ActionsType;
use Illuminate\Http\Request;

class ActionsTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Settings/Index');
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
            'action' => 'required|string|min:5|max:30',
        ]);
    
        ActionsType::create($validatedData);
    
        return to_route('settings.index');
    }
    /**
     * Display the specified resource.
     */
    public function show(ActionsType $actionsType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ActionsType $actionsType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'action' => 'required|string|min:5|max:30',
        ]);
    
        $actionType = ActionsType::findOrFail($id);
        $actionType->update($validatedData);
    
        return back()->with('success', 'Action updated successfully!');
    }    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActionsType $actionsType)
    {
        //
    }
}
