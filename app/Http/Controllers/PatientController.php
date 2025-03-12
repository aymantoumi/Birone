<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActionResource;
use App\Http\Resources\PatientsResource;
use App\Models\action;
use App\Models\ActionsType;
use App\Models\Category;
use App\Models\LabResult;
use App\Models\Medication;
use App\Models\Patient;
use App\Models\Scanner;
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
        $categories = Category::orderBy('created_at', 'desc')->get();

        return inertia('Patients/Registeration', [
            'total_count' => Patient::whereDate('created_at', $today)->count(),
            'waiting' => Action::whereDate('created_at', $today)->where('Status', false)->count(),
            'done' => Action::whereDate('created_at', $today)->where('Status', true)->count(),
            'actionsWaiting' => ActionResource::collection($actionsWaiting),
            'categories' => $categories,
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
            'category_id' => 'required|integer|max:20',
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

        $actionsTypes = ActionsType::all();
        $medications = Medication::all();
        $categories = Category::all();
        $scanners = Scanner::all();
        $lab_results = LabResult::all();

        return Inertia::render('Patients/Patient', [
            'patient' => $patient,
            'actions' => $actions,
            'actionsTypes' => $actionsTypes,
            'categories' => $categories,
            'medications' => $medications,
            'scanners' => $scanners,
            'lab_results' => $lab_results,

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
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20', 
            'gender' => 'required|string|in:male,female,other',
            'category_id' => 'nullable|exists:categories,id', 
            'birth_date' => 'nullable|date|before_or_equal:today', 
            'cin' => 'nullable|string|min:6|max:15|unique:patients,cin,' . $patientId,
            'phone' => 'nullable|string|min:8|max:15|unique:patients,phone,' . $patientId, 
        ]);
    
        $patient = Patient::findOrFail($patientId);
    
        $patient->first_name = $validatedData['first_name'];
        $patient->last_name = $validatedData['last_name'];
        $patient->birth_date = $validatedData['birth_date'];
        $patient->gender = $validatedData['gender'];
        $patient->cin = $validatedData['cin'];
        $patient->phone = $validatedData['phone'];
        $patient->category_id = $validatedData['category_id']; 
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
