<?php

namespace App\Policies;

use App\Model\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FactoryPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return $this->author($user);
    }


    public function update(User $user)
    {
        return $this->author($user);
    }


    public function delete(User $user)
    {
        return $this->author($user);
    }


    private function author(User $user)
    {
        if ($user->farmer()->is_admin == 1) {
            return true;
        }

        if ($user->farmer()->is_add == 1) {
            return true;
        }

        return false;
    }
}
