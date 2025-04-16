<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActionLabResultsResource extends JsonResource
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
            'action' =>  new ActionResource($this->whenLoaded('action')),
            'labResults' => new LabResultsResource($this->whenLoaded('medication')),
            'created_at' => $this->created_at,
        ];
    }
}
