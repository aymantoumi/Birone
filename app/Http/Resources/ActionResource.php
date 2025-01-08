<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActionResource extends JsonResource
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
            'patient_id' => $this->Patient_ID,
            'action' => $this->Action,
            'payment' => $this->Payment,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
