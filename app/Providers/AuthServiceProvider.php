<?php

namespace App\Providers;

use Carbon\Carbon;
use App\Model\Current\Factory;
use Laravel\Passport\Passport;
use App\Policies\FactoryPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

//use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
        Factory::class => FactoryPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        Passport::tokensExpireIn(Carbon::now()->addHours(10));

        Passport::refreshTokensExpireIn(Carbon::now()->addDays(7));
    }
}
