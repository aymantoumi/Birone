<?php

namespace App\Http\Controllers;

use App\Models\LabResult;
use Illuminate\Http\Request;

class LabResultController extends Controller
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
        $validateData = $request->validate([
            'lab_results' => 'required|string|min:3|max:140',
        ]);

        LabResult::create($validateData);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(LabResult $labResult)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LabResult $labResult)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LabResult $labResult)
    {
        $validatedData = $request->validate([
            'lab_results' => 'required|string|min:3|max:140',
        ]);

        $labResult->update($validatedData);

        return back()->with('success', 'Lab result updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LabResult $labResult)
    {
        $labResult->delete();

        return back()->with('success', 'Lab result deleted successfully!');
    }
}
