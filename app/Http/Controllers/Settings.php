<?php

namespace App\Http\Controllers;

use App\Models\ActionsType;
use App\Models\Category;
use Illuminate\Http\Request;

class Settings extends Controller
{
    public function Index()
    {
        $query = ActionsType::query();
        $categories = Category::orderBy('created_at', 'desc')->paginate(5);
        $actionsType = $query->orderBy('created_at', 'desc')->paginate(5);
        return inertia('Settings/Index', [
            'actionsType' => $actionsType,
            'categories' => $categories,
        ]);
    }
}
