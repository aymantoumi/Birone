<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $fromDate = $request->input('from');
        $toDate = $request->input('to');

        if (!$fromDate || !$toDate) {
            $fromDate = Carbon::now()->startOfMonth()->toDateString();
            $toDate = Carbon::now()->endOfMonth()->toDateString();
        }

        $query = Patient::query();

        if ($fromDate && $toDate) {
            $query->whereBetween('created_at', [$fromDate, $toDate]);
        }

        $male_count = (clone $query)->where('gender', 'male')->count();

        $female_count = (clone $query)->where('gender', 'female')->count();

        $actionTypeCounts = Action::select('actions_types_id', DB::raw('count(*) as total'))
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy('actions_types_id')
            ->with('actionType')
            ->get();

        $actionsByStatus = Action::select('actions_types_id', 'Status', DB::raw('count(*) as total'))
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy('actions_types_id', 'Status')
            ->with('actionType')
            ->get();

        $paymentsByActionType = Action::select('actions_types_id', DB::raw('sum(payment) as total_payment'))
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->groupBy('actions_types_id')
            ->with('actionType')
            ->get();

        return inertia('Statistics/Index', [
            'male_count' => $male_count,
            'female_count' => $female_count,
            'actionTypeCounts' => $actionTypeCounts,
            'actionsByStatus' => $actionsByStatus,
            'paymentsByActionType' => $paymentsByActionType,
        ]);
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
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
