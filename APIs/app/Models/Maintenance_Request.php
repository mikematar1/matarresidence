<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance_Request extends Model
{
    use HasFactory;
    protected $fillable = ['customer_id','room_id','reservation_id','status','employee_id'];
}
