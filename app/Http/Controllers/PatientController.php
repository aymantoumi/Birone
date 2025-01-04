<?php

namespace App\Http\Controllers;

use App\Http\Resources\PatientsResource;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

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

        $patientsCount = Patient::count();
        $patientsWaiting = Patient::whereDate('created_at', $today)
            ->orderBy('created_at', 'desc')
            ->where('status', 0)
            ->paginate(6);
        $waiting = Patient::whereDate('created_at', $today)
            ->where('status', 0)
            ->count();
        $done = Patient::whereDate('created_at', $today)->where('status', 1)->count();

        return inertia('Patients/Registeration', [
            'total_count' => $patientsCount,
            'waiting' => $waiting,
            'done' => $done,
            'patientsWaiting' => $patientsWaiting,
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
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
        ]);

        $patient = new Patient($validatedData);
        $patient->save();

        return to_route('Patients.index');
    }

    /**
     * 
     * switch the status of a patient
     * 
     */
    public function changeStatus(Request $request, $patientId)
    {
        $validated = $request->validate([
            'status' => 'required|boolean',
        ]);

        $patient = Patient::findOrFail($patientId);
        $patient->status = $validated['status'];
        $patient->save();

        return back()->with('success', 'Patient status updated successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($patientId)
    {
        $patient = Patient::findOrFail($patientId);

        return Inertia::render('Patients/Patient', [
            'patient' => $patient,
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
    public function update(Request $request, Patient $patient)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'First_Name' => 'required|string|max:255',
            'Last_Name' => 'required|string|max:255',
            'Birth_Date' => 'required|date',
            'Gender' => 'required|in:Male,Female',
            'CIN' => [
                'required',
                'string',
                'max:255',
                Rule::unique('patients', 'CIN')->ignore($patient->id),
            ],
        ]);
    
        // Update the patient record with validated data
        $patient->update($validated);
    
        // Redirect back with a success message
        return redirect()
            ->route('Patients.index') // Adjust the route name as per your routes file
            ->with('success', 'Patient updated successfully.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        //
    }
}
