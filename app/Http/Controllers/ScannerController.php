<?php

namespace App\Http\Controllers;

use App\Models\Scanner;
use Illuminate\Http\Request;

class ScannerController extends Controller
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
        $validatedata = $request->validate([
            'scan' => 'required|string|min:5|max:140',
        ]);

        Scanner::create($validatedata);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Scanner $scanner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Scanner $scanner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $scanner)
    {
        $validatedData = $request->validate([
            'scan' => 'required|string|min:5|max:140',
        ]);
    
        $scanner = Scanner::findOrFail($scanner);
        $scanner->scan = $validatedData['scan'];
    
        // Save the updated scanner to the database
        $scanner->save();
    
        return back()->with('success', 'Scanner updated successfully.');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $scanner = Scanner::find($id);
    
        if ($scanner) {
            $scanner->delete();
            return back()->with('success', 'Scanner deleted successfully!');
        } else {
            return back()->with('error', 'Scanner not found.');
        }
    }
    
}
