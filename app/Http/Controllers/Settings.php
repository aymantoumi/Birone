<?php

namespace App\Http\Controllers;

use App\Models\ActionsType;
use App\Models\Category;
use App\Models\check_up;
use App\Models\LabResult;
use App\Models\Medication;
use App\Models\MedicationClass;
use App\Models\Scanner;

class Settings extends Controller
{
    public function Index()
    {
        $query = ActionsType::query();
        $categories = Category::orderBy('created_at', 'desc')->paginate(5);
        $actionsType = $query->orderBy('created_at', 'desc')->paginate(5);
        $medication_classes = MedicationClass::orderBy('created_at', 'desc')->paginate(5);
        $lab_results = LabResult::orderBy('created_at', 'desc')->paginate(5);
        $scanners = Scanner::orderBy('created_at', 'desc')->paginate(5);
        $medications = Medication::orderBy('created_at', 'desc')->paginate(5);
        $check_ups = check_up::orderBy('created_at', 'desc')->paginate(5);
        return inertia('Settings/Index', [
            'actionsType' => $actionsType,
            'categories' => $categories,
            'medication_classes' => $medication_classes,
            'lab_results' => $lab_results,
            'scanners' => $scanners,
            'medications' => $medications,
            'check_ups' => $check_ups,
        ]);
    }
}
