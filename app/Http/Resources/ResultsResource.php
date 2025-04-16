<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResultsResource extends JsonResource
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
            'resluts' => new CheckUpsResource($this->whenLoaded('check_up')),
            'action' => new ActionResource($this->whenLoaded('action')),
            'created_by' => new UsersResource($this->whenLoaded('user')),
            'created_at' => $this->created_at,
        ];
    }
}
