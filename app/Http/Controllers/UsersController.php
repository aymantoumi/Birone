<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Action;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
    
        if (request('name')) {
            $query->where(function ($q) {
                $q->where('name', 'like', "%" . request('name') . "%");
            });
        }
    
        if (request('email')) {
            $query->where('email', 'like', "%" . request('email') . "%");
        }
    
        if (request('role')) {
            $query->where('role', request('role'));
        }
    
        $users = $query->orderBy('created_at', 'desc')->paginate(10);
    
        return inertia('UsersManagement/Index', [
            'users' => $users,
            'queryParams' => request()->query() ?: null,
        ]);
    }    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('UsersManagement/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        User::create($validatedData);

        return redirect()->route('usersManagement.index')->with('success', 'User created successfully.');
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
    public function edit(Request $request, string $id)
    {
        $user = User::findOrFail($id);
    
        // Determine the date range
        $fromDate = $request->input('from');
        $toDate = $request->input('to');
    
        if (!$fromDate || !$toDate) {
            $fromDate = Carbon::now()->startOfMonth()->toDateString();
            $toDate = Carbon::now()->endOfMonth()->toDateString();
        }
    
        // Generate all dates for the current month or specified range
        $startOfMonth = Carbon::parse($fromDate)->startOfMonth();
        $endOfMonth = Carbon::parse($toDate)->endOfMonth();
        $allDates = [];
        for ($date = $startOfMonth; $date->lte($endOfMonth); $date->addDay()) {
            $allDates[] = $date->format('Y-m-d');
        }
    
        // Fetch actions per day
        $actionsPerDay = Action::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();
    
        // Fetch finished actions per day
        $finishedActionsPerDay = Action::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->where('Status', true)
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();
    
        // Fetch not finished actions per day
        $notFinishedActionsPerDay = Action::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->where('Status', false)
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();
    
        // Fetch patients per day
        $patientsPerDay = Patient::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();
    
        // Merge with all dates to ensure all days are represented
        $patientsPerDay = array_merge(array_fill_keys($allDates, 0), $patientsPerDay);
        $actionsPerDay = array_merge(array_fill_keys($allDates, 0), $actionsPerDay);
        $finishedActionsPerDay = array_merge(array_fill_keys($allDates, 0), $finishedActionsPerDay);
        $notFinishedActionsPerDay = array_merge(array_fill_keys($allDates, 0), $notFinishedActionsPerDay);
    
        return inertia('UsersManagement/Edit', [
            'user' => $user,
            'patientsPerDay' => $patientsPerDay,
            'actionsPerDay' => $actionsPerDay,
            'finishedActionsPerDay' => $finishedActionsPerDay,
            'notFinishedActionsPerDay' => $notFinishedActionsPerDay,
        ]);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|string',
        ]);

        if ($request->filled('password')) {
            $validatedData['password'] = Hash::make($request->password);
        }

        $user->update($validatedData);

        return redirect()->route('usersManagement.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('usersManagement.index')->with('success', 'User deleted successfully.');
    }
}
