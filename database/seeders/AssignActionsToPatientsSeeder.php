<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\Action;
use App\Models\ActionsType;
use Illuminate\Database\Seeder;

class AssignActionsToPatientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch all action types
        $actionTypes = ActionsType::all();

        // Fetch all patients
        $patients = Patient::all();

        foreach ($patients as $patient) {
            // Randomly assign an action type to each patient
            foreach ($actionTypes as $actionType) {
                Action::create([
                    'patient_id' => $patient->id,
                    'actions_types_id' => $actionType->id,
                    'payment' => rand(0, 100), // Example payment amount
                    'created_by' => 1, // Assuming a default user ID for creation
                    'updated_by' => 1, // Assuming a default user ID for updates
                ]);
            }
        }
    }
}
