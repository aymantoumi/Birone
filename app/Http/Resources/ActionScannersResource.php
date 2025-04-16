<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActionScannersResource extends JsonResource
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
            'action' => new ActionResource($this->whenLoaded('action')),
            'scanner' => new ScannersResource($this->whenLoaded('scan')),
            'created_at' => $this->created_at,
        ];
    }
}
