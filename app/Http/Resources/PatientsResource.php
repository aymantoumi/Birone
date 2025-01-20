<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->First_Name,
            'last_name' => $this->Last_Name,
            'cin' => $this->CIN,
            'category' => $this->Category,
            'birth_date' => $this->Birth_Date,
            'gender' => $this->Gender,
            'phone' => $this->Phone,
            'status' => $this->Status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
        ];
    }
}
