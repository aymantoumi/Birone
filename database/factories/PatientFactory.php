<?php

namespace Database\Factories;
use Illuminate\Support\Str;


use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'First_Name' => $this->faker->firstName,
            'Last_Name' => $this->faker->lastName,
            'CIN' => strtoupper(Str::random(2)) . $this->faker->numberBetween(10000, 999999),
            'Category' => $this->faker->word,
            'Birth_Date' => $this->faker->dateTimeBetween('-100 years', '-18 years'),
            'Gender' => $this->faker->randomElement(['Male', 'Female']),
            'Phone' => $this->faker->phoneNumber,
            'Status' => $this->faker->boolean,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
