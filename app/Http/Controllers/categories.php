<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class categories extends Controller
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
            'category' => 'required|string|max:40',
        ]);

        $validateData['created_by'] = auth()->id();

        $category = new Category($validateData);
        $category->save();

        return to_route('settings.index');
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
    public function update(Request $request, string $categoryId)
    {

        $validatedData = $request->validate([
            'category_name' => 'required|string|max:255',
        ]);


        $category = Category::findOrFail($categoryId);

        $category->category = $validatedData['category_name'];
        $category->updated_by = auth()->id();


        $category->save();

        return back()->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);
       
        if ($category) {
            $category->delete();
            return back()->with('success', 'Category deleted successfully!');
        } else {
            return back()->with('error', 'Category not found.');
        }
    }     
    
}
