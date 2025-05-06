<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DisasterResponseController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\MaintenanceRequestController;
use App\Http\Controllers\PaymentOptionController;
use App\Http\Controllers\Photo_Gallery;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\RegulationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\SupplyController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\TaskController;
use App\Models\EmailSender;
use App\Models\Maintenance_Request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(["prefix"=>"v0.1"], function(){
    Route::group(['prefix'=>'auth'],function(){
        Route::post('login',[AuthController::class, 'login']);
        Route::post('register',[AuthController::class, 'register']);
        Route::get('logout',[AuthController::class, 'logout']);
        Route::get('refresh',[AuthController::class, 'refresh']);
    });



    Route::group(['prefix'=>'room'],function(){
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::post('add',[RoomController::class,'addRoom']);
            Route::post('edit',[RoomController::class,'editRoom']);
            Route::get('remove/{roomid}',[RoomController::class,'removeRoom']);
            Route::group(['prefix'=>'images'],function(){
                Route::post('add',[ImageController::class,'uploadRoomImages']);
                Route::post('edit',[ImageController::class,'addAndRemoveImages']);
            });
        });
        Route::middleware(['auth', 'check.admin'])->group(function(){
            Route::get('getcount',[RoomController::class,'getRoomCount']);
        });
        Route::group(['prefix'=>'reservation'],function(){
            Route::middleware(['auth', 'check.reservationmanager'])->group(function(){
                Route::get('get',[RoomController::class,'getReservations']);
                Route::get('cancel_res/{reservationid}',[CustomerController::class,'cancelReservation']);
                Route::post('search',[RoomController::class,'searchReservation']);
            });
            Route::middleware(['auth', 'check.admin'])->group(function(){
                Route::get('getcount',[RoomController::class,'getReservationsCount']);
                Route::get('getrevenue',[StaffController::class,'getRevenue']);
            });
            Route::middleware(['auth', 'check.customer'])->group(function(){
                Route::post('reserve',[CustomerController::class,'reserveRoom']);
                Route::post('edit',[CustomerController::class,'editReservation']);
                Route::get('cancel/{reservationid}',[CustomerController::class,'cancelReservation']);
                Route::get('getreservations',[RoomController::class,'getCustomerReservations']);
            });

        });

        Route::get('get',[RoomController::class,'getRooms']);
    });



    Route::group(['prefix'=>'customer'],function(){
        Route::middleware(['auth', 'check.usermanager'])->group(function(){
            Route::get('ban/{customerid}',[CustomerController::class,'banCustomer']);
            Route::get('get',[CustomerController::class,'getCustomers']);
            Route::post('search',[CustomerController::class,'searchCustomer']);
        });
        Route::middleware(['auth', 'check.admin'])->group(function(){
            Route::get('getcount',[CustomerController::class,'getCustomerCount']);
        });
        Route::middleware(['auth', 'check.customer'])->group(function(){
            Route::post('editinfo',[CustomerController::class,'editInformation']);
            Route::get('getinfo',[CustomerController::class,'getInformation']);
            Route::get('remove',[CustomerController::class,'removeAccount']);


        });

    });



    Route::group(['prefix'=>'staff'],function(){
        Route::middleware(['auth', 'check.usermanager'])->group(function(){

            Route::post('editinfo',[StaffController::class,'editInformation']);
            Route::get('ban/{employeeid}',[StaffController::class,'banEmployee']);
            Route::post('search',[StaffController::class,'searchEmployee']);
            Route::get('get',[StaffController::class,'getEmployees']);
            Route::post('add',[StaffController::class,'addEmployee']);
            Route::get('getinfo',[StaffController::class,'getInformation']);

        });

    });



    Route::group(['prefix'=>'discount'],function(){
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::post("addwhole",[DiscountController::class,'addWholeDiscount']);
            Route::post("add",[DiscountController::class,'addRoomDiscount']);
            Route::post("removewhole",[DiscountController::class,'removeWholeDiscount']);
            Route::post("remove",[DiscountController::class,'removeRoomDiscount']);



        });
        Route::middleware(['auth', 'check.customer'])->group(function(){



        });
        Route::get("get",[DiscountController::class,'getDiscountedRooms']);

    });



    Route::group(['prefix'=>'faq'],function(){
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::post('add',[FAQController::class,'addFAQ']);
            Route::post('edit',[FAQController::class,'editFAQ']);
            Route::get('remove/{faqid}',[FAQController::class,'removeFAQ']);

        });
        Route::middleware(['auth', 'check.customer'])->group(function(){



        });
        Route::get('get',[FAQController::class,'getFAQs']);

    });



    Route::group(['prefix'=>'policy'],function(){
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::post('add',[PolicyController::class,'addPolicy']);
            Route::post('edit',[PolicyController::class,'editPolicy']);
            Route::get('remove/{policyid}',[PolicyController::class,'removePolicy']);

        });
        Route::middleware(['auth', 'check.customer'])->group(function(){



        });
        Route::get('get',[PolicyController::class,'getPolicies']);

    });



    Route::group(['prefix'=>'supply'],function(){
        Route::middleware(['auth', 'check.usermanager'])->group(function(){
            Route::post('add',[SupplyController::class,'addNewSupplyItem']);
            Route::post('increment',[SupplyController::class,'IncreaseAmount']);
            Route::post('edit',[SupplyController::class,'edit']);
            Route::get('remove/{supplyid}',[SupplyController::class,'deleteItem']);
            Route::get('get',[SupplyController::class,'getSupplies']);

        });


    });




    Route::group(['prefix'=>'maintenance'],function(){
        Route::middleware(['auth', 'check.usermanager'])->group(function(){
            Route::get('complete/{requestid}',[MaintenanceRequestController::class,'completeRequest']);
            Route::get('get',[MaintenanceRequestController::class,'getPendingRequests']);
            Route::get('getcompleted',[MaintenanceRequestController::class,'getCompletedRequests']);
            Route::post('assign',[MaintenanceRequestController::class,'assignEmployee']);
        });
        Route::middleware(['auth', 'check.customer'])->group(function(){
            Route::post('add',[MaintenanceRequestController::class,'addRequest']);
        });
    });


    Route::group(['prefix'=>'task'],function(){
        Route::middleware(['auth', 'check.usermanager'])->group(function(){
            Route::post('add',[TaskController::class,'addTask']);
            Route::post('edit',[TaskController::class,'editTask']);
            Route::get('remove/{taskid}',[TaskController::class,'removeTask']);
            Route::get('getall',[TaskController::class,'getTasks']);

        });
        Route::middleware(['auth', 'check.employee'])->group(function(){
            Route::get('get',[TaskController::class,'getEmployeeTasks']);
        });
    });

    Route::group(['prefix'=>'feedback'],function(){
        Route::middleware(['auth', 'check.usermanager'])->group(function(){
            Route::get('get',[FeedbackController::class,'getFeedbacks']);

        });
        Route::middleware(['auth', 'check.customer'])->group(function(){
            Route::post('add',[FeedbackController::class,'addFeedback']);
        });
    });

    Route::group(['prefix'=>'budget'],function(){
        Route::middleware(['auth', 'check.financemanager'])->group(function(){
            Route::post('add',[BudgetController::class,'addBudget']);
            Route::get('remove/{budgetid}',[BudgetController::class,'removeBudget']);
            Route::get('get',[BudgetController::class,'getBudgets']);
        });

    });

    Route::group(['prefix'=>'response'],function(){
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::post('add',[DisasterResponseController::class,'addDisasterResponse']);
            Route::post('edit',[DisasterResponseController::class,'editDisasterResponse']);
            Route::get('remove/{responseid}',[DisasterResponseController::class,'removeDisasterResponse']);

        });
        Route::get('get',[DisasterResponseController::class,'getDisasterResponses']);

    });


    Route::group(['prefix'=>'regulation'],function(){
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::post('add',[RegulationController::class,'addRegulation']);
            Route::post('edit',[RegulationController::class,'editRegulation']);
            Route::get('remove/{regulationid}',[RegulationController::class,'removeRegulation']);
        });
        Route::get('get',[RegulationController::class,'getRegulations']);
    });


    Route::group(['prefix'=>'payment'],function(){
        Route::middleware(['auth', 'check.financemanager'])->group(function(){
            Route::post('add',[PaymentOptionController::class,'addPaymentOption']);
            Route::post('select',[PaymentOptionController::class,'selectOptions']);
            Route::get('getall',[PaymentOptionController::class,'getPaymentOptions']);
            Route::get('set/{payment_option_id}',[PaymentOptionController::class,'setavailability']);
        });
        Route::get('get',[PaymentOptionController::class,'getAvailablePaymentOptions']);
    });


    Route::group(['prefix'=>'currency'],function(){
        Route::middleware(['auth', 'check.financemanager'])->group(function(){
            Route::post('add',[CurrencyController::class,'addCurrency']);
            Route::post('select',[CurrencyController::class,'selectOptions']);
            Route::get('getall',[CurrencyController::class,'getCurrencies']);
            Route::get('set/{currencyid}',[CurrencyController::class,'setavailability']);
        });
        Route::get('get',[CurrencyController::class,'getAvailableCurrencies']);

    });


    Route::group(['prefix'=>'language'],function(){
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::post('add',[LanguageController::class,'addLanguage']);
            Route::post('select',[LanguageController::class,'selectLanguages']);
            Route::get('getall',[LanguageController::class,'getLanguages']);
            Route::get('set/{languageid}',[LanguageController::class,'setavailability']);
        });
        Route::get('get',[LanguageController::class,'getAvailableLanguages']);
    });


    Route::group(['prefix'=>'gallery'],function(){
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::post('edit',[Photo_Gallery::class,'addAndRemoveImages']);

        });
        Route::get('get',[Photo_Gallery::class,'getImages']);
    });


    Route::group(['prefix'=>'email'],function(){
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::post('sendall',[EmailController::class,'sendEmailToUsers']);
        });
        Route::post('sendform',[EmailController::class,'sendEmailContactForm']);
    });

    Route::group(['prefix'=>'review'],function(){
        Route::middleware(['auth', 'check.customer'])->group(function(){
            Route::post('add',[ReviewController::class,'addReview']);
            Route::post('edit',[ReviewController::class,'editReview']);
            Route::get('remove/{reviewid}',[ReviewController::class,'deleteReview']);

        });
        Route::middleware(['auth', 'check.contentmanager'])->group(function(){
            Route::get('feature/{reviewid}',[ReviewController::class,'featureReview']);
            Route::get('getall',[ReviewController::class,'getReviews']);
        });
        Route::get('get',[ReviewController::class,'getFeaturedReviews']);


    });


});
