<?php

namespace App\Http\Controllers;

use App\Http\Resources\PatientsResource;
use App\Models\action;
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
    
        // Count all patients
        $patientsCount = Patient::count();
    
        // Get actions where Status is false (waiting) and join with patient data
        $actionsWaiting = Action::whereDate('created_at', $today)
            ->where('Status', false)
            ->with('patient') // Assuming a relationship exists in the Action model
            ->orderBy('created_at', 'desc')
            ->paginate(6);
    
        // Count waiting and done actions for today
        $waiting = Action::whereDate('created_at', $today)
            ->where('Status', false)
            ->count();
    
        $done = Action::whereDate('created_at', $today)
            ->where('Status', true)
            ->count();
    
        return inertia('Patients/Registeration', [
            'total_count' => $patientsCount,
            'waiting' => $waiting,
            'done' => $done,
            'actionsWaiting' => $actionsWaiting,
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
        $action = action::where('patient_id', $patientId)->orderBy('created_at', 'desc')->paginate(5);

        return Inertia::render('Patients/Patient', [
            'patient' => $patient,
            'actions' => $action, 
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
        // Fetch the patient record by ID
        $patient = Patient::findOrFail($patientId);

        // Update the patient record manually
        $patient->First_Name = $request->input('First_Name');
        $patient->Last_Name = $request->input('Last_Name');
        $patient->Birth_Date = $request->input('Birth_Date');
        $patient->Gender = $request->input('Gender');
        $patient->CIN = $request->input('CIN');
        $patient->Phone = $request->input('Phone'); // Add this line
        $patient->save();

        // Return a success response (Inertia redirect)
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
