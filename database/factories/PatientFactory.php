<?php

namespace Database\Factories;

use App\Models\Category;
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
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'cin' => strtoupper(Str::random(2)) . $this->faker->numberBetween(10000, 999999),
            'category_id' => Category::factory(), 
            'birth_date' => $this->faker->dateTimeBetween('-100 years', '-18 years'),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'phone' => $this->faker->phoneNumber,
            'created_by' => 1, 
            'updated_by' => 1, 
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
