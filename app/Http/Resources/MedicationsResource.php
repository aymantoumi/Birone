<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicationsResource extends JsonResource
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
            'medication' => $this->medication,
            'medication_class' => new MedicationClassesResource($this->whenLoaded('medication_class')),
            'created_at' => $this->created_at,
        ];
    }
}
