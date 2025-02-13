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

        return inertia('UsersManagement/index', [
            'users' => $users,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('UsersManagement/create');
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

        // Fetch actions per day for the specific user
        $actionsPerDay = Action::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->where('created_by', $user->id)
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();

        // Fetch finished actions per day for the specific user
        $finishedActionsPerDay = Action::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->where('created_by', $user->id)
            ->where('Status', true)
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();

        // Fetch not finished actions per day for the specific user
        $notFinishedActionsPerDay = Action::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->where('created_by', $user->id)
            ->where('Status', false)
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('total', 'date')->toArray();

        // Fetch patients per day for the specific user
        $patientsPerDay = Patient::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'))
            ->where('created_by', $user->id)
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
    public function update(Request $request, string $userId)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($userId)],
            'role' => 'required|string',
        ]);

        // Find the user by ID
        $user = User::findOrFail($userId);

        // Assign validated data to the user model
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->role = $validatedData['role'];

        // Update the password only if it's provided in the request
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        // Optionally, track who updated the user (if applicable)
        $user->updated_by = auth()->id();

        // Save the changes to the database
        $user->save();

        // Redirect back with a success message
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
