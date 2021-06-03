var app = angular.module("myApp", ["ngAnimate", "toaster"]);
app.controller("myController", function ($scope, toaster) {
  // list containing the user data
  $scope.currentData = [];
  $scope.startIndex = 0;
  $scope.lastIndex = 5;
  $scope.pages = 3;
  $scope.pgNum = 1;

  var count = 0;
  var temp = 0;
  $scope.currentNumber = 0;
  $scope.educationQualification = [
    {
      degree: "",
      inst: "",
      InstituteStartDate: "",
      InstituteEndDate: "",
      percentage: "",
      delete: false,
      countRow: count,
    },
  ];

  var empty = angular.copy($scope.educationQualification);
  function emptyFields() {
    $scope.name = "";
    $scope.email = "";
    $scope.phone = "";
    $scope.gender = "";
    $scope.correctAge = "";
    $scope.dob = "";
    $scope.currentNumber = 0;
    $scope.address = "";

    $scope.nameErr = "";
    $scope.emailErr = "";
    $scope.phoneErr = "";
    $scope.genderErr = "";
    $scope.ageErr = "";
    $scope.dobErr = "";
    $scope.invalidAge = "";
    $scope.nameInvalid = "";
    $scope.addressErr = "";
    $scope.emailInvalid = "";

    $scope.showSave = true;
    $scope.showUpdate = "";

    $scope.showTable1 = true;

    $scope.educationQualification = empty;

    $scope.form.$setPristine();
    $scope.form.$setUntouched();
  }

  function validations() {
    let result = false;
    let flag = 0;
    if ($scope.name == "") {
      $scope.nameErr = true;
      flag++;
    }
    if ($scope.form.name.$dirty && $scope.form.name.$invalid) {
      $scope.nameInvalid = true;
      flag++;
    }
    if ($scope.form.email.$error.required) {
      $scope.emailErr = true;
      flag++;
    } else if ($scope.form.email.$dirty && $scope.form.email.$invalid) {
      $scope.emailInvalid = true;
      flag++;
    }
    if ($scope.phone == "") {
      $scope.phoneErr = true;
      flag++;
    }
    if ($scope.form.phone.$dirty && $scope.form.phone.$invalid) {
      $scope.phoneInvalid = true;
      flag++;
    }
    if ($scope.address == "") {
      $scope.addressErr = true;
      flag++;
    }
    if ($scope.dob == "") {
      $scope.dobErr = true;
      flag++;
    }
    if ($scope.form.dob.$dirty && $scope.form.dob.$invalid) {
      $scope.dobInvalid = true;
      flag++;
    }
    if ($scope.gender == "") {
      $scope.genderErr = true;
      flag++;
    }
    if ($scope.gender === "male" || $scope.gender === "female") {
      $scope.genderErr = "";
    }
    if (
      flag == 0 &&
      $scope.name &&
      $scope.email &&
      $scope.phone &&
      $scope.gender &&
      $scope.dob &&
      $scope.correctAge != "Invalid" &&
      $scope.address
    ) {
      result = true;
    } else {
      result = false;
    }

    return result;
  }

  function userHandling() {
    var new_user = {};
    new_user.Name = $scope.name;
    new_user.Email = $scope.email;
    new_user.Phone = $scope.phone;
    new_user.Image = angular.lowercase($scope.gender);
    new_user.Age = $scope.correctAge;
    new_user.Dob = $scope.dob;
    new_user.Address = $scope.address;
    new_user.educationQualification = $scope.educationQualification;
    $scope.startIndex = 0;
    $scope.lastIndex = 5;
    $scope.pgNum = 1;

    return new_user;
  }

  $scope.userList = [
    {
      Name: "Martin",
      Email: "martin@patienbond.com",
      Phone: 1234567890,
      // class for the gender icon
      Image: "male",
      Age: 24,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "Thapar",
          StartDate: "01/05/2003",
          EndDate: "04/04/2007",
          Cgpa: "10",
        },
        {
          Degree: "Post Graduation",
          Institute: "DAV",
          StartDate: "03/01/2004",
          EndDate: "01/06/2008",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Harry",
      Email: "harry@hotmail.com",
      Phone: 4563745678,
      Image: "male",
      Age: 22,
      Dob: "11/11/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Pat",
      Email: "pat@hotmail.com",
      Phone: 3435344535,
      Image: "male",
      Age: 21,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Alex",
      Email: "alex@hotmail.com",
      Phone: 0987654321,
      Image: "male",
      Age: 23,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Nora Smith",
      Email: "nora@hotmail.com",
      Phone: 6754890876,
      Image: "female",
      Age: 23,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Peter",
      Email: "peter@patienbond.com",
      Phone: 1888267890,
      Image: "male",
      Age: 28,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Mark",
      Email: "mark@gmail.com",
      Phone: 1122334455,
      Image: "male",
      Age: 25,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "John",
      Email: "john@hotmail.com",
      Phone: 1235344321,
      Image: "male",
      Age: 20,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Mary",
      Email: "mary@gmail.com",
      Phone: 0987654321,
      Image: "female",
      Age: 23,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Rahul",
      Email: "rahul@hotmail.com",
      Phone: 6754890888,
      Image: "male",
      Age: 25,
      Address: "Delhi",
      Dob: "10/10/1999",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Bill Gates",
      Email: "bill@patienbond.com",
      Phone: 1111267770,
      Image: "male",
      Dob: "10/10/1999",
      Address: "Delhi",
      Age: 65,
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Elon Musk",
      Email: "musk@gmail.com",
      Phone: 1099447755,
      Image: "male",
      Dob: "10/10/1999",
      Age: 49,
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Sachin",
      Email: "sachin@hotmail.com",
      Phone: 1234987650,
      Image: "male",
      Dob: "10/10/1999",
      Age: 45,
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Messi",
      Email: "messi@gmail.com",
      Phone: 7888654321,
      Image: "male",
      Age: 35,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
    {
      Name: "Ronaldo",
      Email: "ronaldo@hotmail.com",
      Phone: 3334380888,
      Image: "male",
      Age: 37,
      Dob: "10/10/1999",
      Address: "Delhi",
      educationQualification: [
        {
          Degree: "Graduation",
          Institute: "QW",
          StartDate: "01/01/2002",
          EndDate: "01/04/2005",
          Cgpa: "10",
        },
        {
          Degree: "Others",
          Institute: "AS",
          StartDate: "01/01/2003",
          EndDate: "01/06/2007",
          Cgpa: "9.5",
        },
      ],
    },
  ];

  // taking an empty array to store the data to show on current page

  var userLength = $scope.userList.length;

  // angular.forEach($scope.userList, function (val, key) {
  //   if (key >= $scope.startIndex && key < $scope.lastIndex) {
  //     $scope.currentData.push(val);
  //   }
  // });

  updateData();
  // updating the data in the currentData array
  function updateData() {
    $scope.currentData = [];
    angular.forEach($scope.userList, function (val, key) {
      if (key >= $scope.startIndex && key < $scope.lastIndex) {
        $scope.currentData.push(val);
      }
    });
  }

  // to go to prev page
  $scope.prev = function () {
    if ($scope.startIndex > 0) {
      $scope.startIndex = $scope.startIndex - 5;
      $scope.lastIndex = $scope.lastIndex - 5;
      $scope.pgNum--;
      updateData();
    }
  };

  // to go to next page
  $scope.next = function () {
    if ($scope.lastIndex < $scope.userList.length) {
      $scope.startIndex = $scope.startIndex + 5;
      $scope.lastIndex = $scope.lastIndex + 5;
      $scope.pgNum++;
      updateData();
    }
  };

  $scope.changeName = function () {
    $scope.nameErr = "";
    $scope.nameInvalid = "";
  };
  $scope.changeEmail = function () {
    $scope.emailErr = "";
    $scope.emailInvalid = "";
  };
  $scope.changePhone = function () {
    $scope.phoneErr = "";
    $scope.phoneInvalid = "";
  };
  $scope.changeGender = function () {
    $scope.genderErr = "";
  };
  $scope.changeAddress = function () {
    $scope.addressErr = "";
  };
  $scope.changeDob = function () {
    $scope.dobErr = "";
    $scope.dobInvalid = "";
  };

  $scope.calculateAge = function () {
    $scope.showAge = true;
    const now = new Date();
    const diff = now - $scope.dob;
    if (diff < 0) {
      $scope.invalidAge = true;
      $scope.correctAge = "Invalid";
    } else {
      $scope.invalidAge = "";
      var decimalAge = diff / (1000 * 60 * 60 * 24 * 365);
      if (decimalAge > 0 && decimalAge < 1) {
        $scope.correctAge = 1;
      } else {
        $scope.correctAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      }
    }
  };

  //add form in education field in form//
  $scope.addFormDegreeRow = function (wantedToAddnext, index) {
    var newQualificationRowOb = {
      Degree: "Degree",
      inst: "",
      InstituteStartDate: "",
      InstituteEndDate: "",
      percentage: "",
      delete: false,
      countRow: ++count,
    };
    $scope.educationQualification.splice(
      wantedToAddnext.countRow + 1,
      0,
      newQualificationRowOb
    );

    $scope.currentNumber = wantedToAddnext.countRow + 1;

    //reset countRow in ascending number//
    var newCount = 0;
    angular.forEach($scope.educationQualification, function (ob) {
      ob.countRow = newCount;
      // $scope.currentNumber = newCount;
      newCount++;
    });
  };

  //delete row in education field in form//
  $scope.delFormDegreeRow = function (wantedToDeleteOb) {
    if ($scope.educationQualification.length != 1) {
      wantedToDeleteOb.delete = true;
      var oldQualificationRowOb = $scope.educationQualification;

      $scope.educationQualification = [];

      angular.forEach(oldQualificationRowOb, function (ob) {
        if (ob.delete == false) {
          $scope.educationQualification.push(ob);
        }
      });
    }
  };

  $scope.addInstituteName = function (selectedUser, value, modelName) {
    if (modelName == "dropdown") {
      selectedUser.Degree = value;
    }
    if (modelName == "institute") {
      selectedUser.Institute = value;
    }
    if (modelName == "InstituteStartDate") {
      selectedUser.StartDate = value;
    }
    if (modelName == "InstituteEndDate") {
      selectedUser.EndDate = value;
    }
    if (modelName == "percentage") {
      selectedUser.Cgpa = value;
    }
  };

  $scope.deleteUser = function (val) {
    var index = val;
    $scope.confirmDel = function () {
      $scope.userList.splice(index, 1);

      userLength--;
      if (userLength % 5 == 0) {
        $scope.pages--;
      }
      if (userLength == 0) {
        $scope.pages = 0;
        $scope.pgNum = 0;
      }

      updateData();
      $("#confirm").modal("hide");
    };
  };

  $scope.editUser = function (user) {
    $scope.showSave = "";
    $scope.showUpdate = true;

    $scope.showTable1 = "";
    $scope.name = user.Name;
    $scope.email = user.Email;
    $scope.phone = user.Phone;
    $scope.address = user.Address;
    $scope.correctAge = user.Age;
    $scope.gender = user.Image;

    $scope.dob = new Date(user.Dob);
    $scope.educationQualification = user.educationQualification;

    for (let i = 0; i < user.educationQualification.length; i++) {
      $scope.educationQualification[i].InstituteStartDate = new Date(
        user.educationQualification[i].StartDate
      );

      $scope.educationQualification[i].InstituteEndDate = new Date(
        user.educationQualification[i].EndDate
      );
    }

    $scope.delRow = function (val) {
      $scope.educationQualification.splice(val, 1);
      // $scope.currentNumber = val;
    };

    temp = $scope.userList.indexOf(user);

    // UPDATING THE VALUES
    $scope.updateBtn = function () {
      if (validations()) {
        let updateUser = userHandling();
        $scope.userList.splice(temp, 1, updateUser);

        updateData();

        emptyFields();

        $("#myModal").modal("hide");
        toaster.pop("success", "Notification", "User Updated Succesfully");

        // setTimeout(function () {
        //   $("#msgUpdate").modal("show");
        //   setTimeout(function () {
        //     $("#msgUpdate").modal("hide");
        //   }, 2000);
        // }, 400);
      }
    };
  };

  $scope.save = function () {
    // console.log(answer);

    if (validations()) {
      let addNewUser = userHandling();
      $scope.userList.unshift(addNewUser);

      updateData();

      userLength++;
      if (userLength / 5 > $scope.pages) {
        $scope.pages++;
      }

      emptyFields();

      $("#myModal").modal("hide");
      toaster.pop("success", "Notification", "User Added Succesfully");

      // setTimeout(function () {
      //   $("#msg").modal("show");
      //   setTimeout(function () {
      //     $("#msg").modal("hide");
      //   }, 2000);
      // }, 400);
    }
  };

  $scope.closeBtn = function () {
    emptyFields();
  };

  $scope.addBtn = function () {
    emptyFields();
  };

  $scope.showInfo = function (val) {
    $scope.nameInfo = val.Name;
    $scope.emailInfo = val.Email;
    $scope.phoneInfo = val.Phone;
    $scope.genderInfo = angular.uppercase(val.Image);
    $scope.ageInfo = val.Age;
    $scope.addressInfo = val.Address;
    $scope.dobInfo = val.Dob;

    $scope.selectedUser = val;
  };
});
