<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActionResource;
use App\Http\Resources\PatientsResource;
use App\Models\action;
use App\Models\ActionsType;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Patient::query();

        if (request('name')) {
            $query->where(function ($q) {
                $q->where('First_Name', 'like', "%" . request('name') . "%")
                    ->orWhere('Last_Name', 'like', "%" . request('name') . "%")
                    ->orWhereRaw("CONCAT(First_Name, ' ', Last_Name) LIKE ?", ["%" . request('name') . "%"]);
            });
        }

        if (request('cin')) {
            $query->where('CIN', 'like', "%" . request('cin') . "%");
        }

        if (request('gender')) {
            $query->where('Gender', request('gender'));
        }

        if (request('phone')) {
            $query->where('Phone', 'like', "%" . request('phone') . "%");
        }

        $patients = $query->orderBy('created_at', 'desc')->paginate(10);

        return inertia('Patients/Index', [
            "patients" => PatientsResource::collection($patients),
            "queryParams" => request()->query() ?: null,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $today = date('Y-m-d');

        // Check actions for today
        $actionsWaiting = Action::whereDate('created_at', $today)
            ->with(['patient', 'actionType'])
            ->where('Status', false)
            ->paginate(6);


        // Other statistics
        $patientsCount = Patient::count();
        $waiting = Action::whereDate('created_at', $today)
            ->where('Status', false)
            ->count();
        $done = Action::whereDate('created_at', $today)
            ->where('Status', true)
            ->count();

        return inertia('Patients/Registeration', [
            'total_count' => Patient::count(),
            'waiting' => Action::whereDate('created_at', $today)->where('Status', false)->count(),
            'done' => Action::whereDate('created_at', $today)->where('Status', true)->count(),
            'actionsWaiting' => ActionResource::collection($actionsWaiting),
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'cin' => 'nullable|string',
            'category' => 'required|string|max:20',
            'gender' => 'required|string|max:20',
            'phone' => 'nullable|digits:10',
            'birth_date' => 'nullable|date',
        ]);
        $validatedData['created_by'] = auth()->id();

        $patient = new Patient($validatedData);
        $patient->save();

        return to_route('Patients.index');
    }
    /**
     * Display the specified resource.
     */
    public function show($patientId)
    {
        $patient = Patient::findOrFail($patientId);
        
        // Load actions with actionType relationship
        $actions = Action::where('patient_id', $patientId)
            ->orderBy('created_at', 'desc')
            ->with(['actionType'])  // Ensure the actionType is loaded
            ->paginate(5);
    
        // Get all actions types for dropdown or selection, as needed
        $actionsTypes = ActionsType::all();
    
        return Inertia::render('Patients/Patient', [
            'patient' => $patient,
            'actions' => $actions,
            'actionsTypes' => $actionsTypes,
        ]);
    }    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $patientId)
    {
        $validatedData = $request->validate([
            'First_Name' => 'required|string|max:20',
            'Last_Name' => 'required|string|max:20',
            'CIN' => 'nullable|string',
            'Birth_Date' => 'nullable|date',
            'Gender' => 'required|string|max:20',
            'Phone' => 'nullable|digits:10',
        ]);

        $patient = Patient::findOrFail($patientId);

        $patient->First_Name = $validatedData['First_Name'];
        $patient->Last_Name = $validatedData['Last_Name'];
        $patient->Birth_Date = $validatedData['Birth_Date'];
        $patient->Gender = $validatedData['Gender'];
        $patient->CIN = $validatedData['CIN'];
        $patient->Phone = $validatedData['Phone'];
        $patient->updated_by = auth()->id();

        $patient->save();

        return back()->with('success', 'Patient updated successfully.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        //
    }
}
