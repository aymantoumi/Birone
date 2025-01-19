<?php

namespace App\Http\Controllers;

use App\Models\ActionsType;
use Illuminate\Http\Request;

class Settings extends Controller
{
    public function Index()
    {
        $query = ActionsType::query();
        $actionsType = $query->orderBy('created_at', 'desc')->paginate(5);
        return inertia('Settings/Index', [
            'actionsType' => $actionsType,
        ]);
    }
}
