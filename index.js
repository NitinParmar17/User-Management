var app = angular.module("myApp", ["ngAnimate", "toaster", "chart.js"]);

app.directive("myTable", function ($filter) {
  return {
    restrict: "E",
    transclude: true,
    scope: {
      data: "=",
      list: "=",
      first: "=",
      last: "=",
      rows: "=",
      page: "=",
      del: "&",
      search: "@",
      edit: "&",
      carousl: "&",
    },
    templateUrl: "component-table-template.html",
    replace: false,

    link: function (scope) {
      showBy();
      function showBy() {
        scope.byName = false;
        scope.byEmail = false;
        scope.byPhone = false;
        scope.byAge = false;
        scope.byImage = false;
        scope.byDob = false;
      }
      sortingBy();
      function sortingBy() {
        scope.nameSort = true;
        scope.phoneSort = true;
        scope.ageSort = true;
        scope.emailSort = true;
        scope.imageSort = true;
        scope.dobSort = true;
      }
      onStart();
      function onStart() {
        scope.editDegErr == false;
        scope.degreeErr = false;
        scope.nameSort = false;
        scope.byName = true;

        scope.reverseName = false;
        scope.reverseAge = false;
        scope.reverseEmail = false;
        scope.reversePhone = false;
        scope.reverseGender = false;
      }

      scope.sortBy = function (obj) {
        console.log(obj);
        sortingBy();
        showBy();

        scope[obj.toLowerCase() + "Sort"] = false;
        scope["by" + obj] = true;

        scope.list = $filter("orderBy")(
          scope.list,
          (scope["reverse" + obj] ? "" : "-") + obj
        );
        scope["reverse" + obj] = !scope["reverse" + obj];

        scope.first = 0;
        scope.page = 1;
        scope.last = scope.rows;
        update();
      };

      function update() {
        scope.data = [];
        angular.forEach(scope.list, function (val, key) {
          if (key >= scope.first && key < scope.last) {
            scope.data.push(val);
          }
        });
      }
    },
  };
});

app.controller("myController", function ($scope, toaster, $filter) {
  // list containing the user data

  // showBy();
  // function showBy() {
  //   $scope.byName = false;
  //   $scope.byEmail = false;
  //   $scope.byPhone = false;
  //   $scope.byAge = false;
  //   $scope.byImage = false;
  //   $scope.byDob = false;
  // }
  // sortingBy();
  // function sortingBy() {
  //   $scope.nameSort = true;
  //   $scope.phoneSort = true;
  //   $scope.ageSort = true;
  //   $scope.emailSort = true;
  //   $scope.imageSort = true;
  //   $scope.dobSort = true;
  // }
  onLoading();
  function onLoading() {
    $scope.currentData = [];
    $scope.startIndex = 0;
    $scope.lastIndex = 5;
    $scope.pages = 3;
    $scope.pgNum = 1;
    $scope.tableRows = 5;
    $scope.editDegErr == false;
    $scope.degreeErr = false;
    // $scope.nameSort = false;
    // $scope.byName = true;

    // $scope.reverseName = false;
    // $scope.reverseAge = false;
    // $scope.reverseEmail = false;
    // $scope.reversePhone = false;
    // $scope.reverseGender = false;
  }

  // $scope.sortBy = function (obj) {
  //   sortingBy();
  //   showBy();

  //   $scope[obj.toLowerCase() + "Sort"] = false;
  //   $scope["by" + obj] = true;
  //   $scope.userList = $filter("orderBy")(
  //     $scope.userList,
  //     ($scope["reverse" + obj] ? "" : "-") + obj
  //   );
  //   $scope["reverse" + obj] = !$scope["reverse" + obj];

  //   $scope.startIndex = 0;
  //   $scope.pgNum = 1;
  //   $scope.lastIndex = $scope.tableRows;
  //   updateData();
  // };

  $scope.disableDel = false;
  editEduErrors();
  eduErrors();
  function editEduErrors() {
    $scope.editInstErr = false;
    $scope.editStartErr = false;
    $scope.editEndErr = false;
    $scope.editPercErr = false;
    $scope.editDegErr = false;
  }
  function eduErrors() {
    $scope.instituteErr = false;
    $scope.degreeErr = false;
    $scope.startDateErr = false;
    $scope.endDateErr = false;
    $scope.percentageErr = false;
  }
  var count = 0;
  var temp = 0;

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
    $scope.disableDel = false;

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

    $scope.form.$setPristine();
    $scope.form.$setUntouched();
  }

  function eduValidations() {
    let temp = 0;

    if ($scope.form.institute.$error.required) {
      $scope.instituteErr = true;
      temp++;
      // console.log($scope.instituteErr);
    }
    if ($scope.form.InstituteStartDate.$error.required) {
      $scope.startDateErr = true;
      temp++;
    }
    if ($scope.form.InstituteEndDate.$error.required) {
      $scope.endDateErr = true;
      temp++;
    }
    if ($scope.form.percentage.$error.required) {
      $scope.percentageErr = true;
      temp++;
    }
    if ($scope.form.dropdownMenuButton.$untouched) {
      $scope.degreeErr = true;
      // console.log($scope.degreeErr);
      // console.log($scope.dropdownValue);
    }
    // console.log($scope.degreeErr);
    // console.log($scope.dropdownValue);
    if (temp == 0) {
      return true;
    } else {
      return false;
    }
  }
  // function editEduValidations() {
  //   if ($scope.form.institute.$error.required) {
  //     $scope.editInstErr = true;
  //   }
  //   if ($scope.form.startDate.$error.required) {
  //     $scope.editStartErr = true;
  //   }
  //   if ($scope.form.endDate.$error.required) {
  //     $scope.editEndErr = true;
  //   }
  //   if ($scope.form.percentage.$error.required) {
  //     $scope.editPercErr = true;
  //   }
  //   if ($scope.form.dropdownMenuButton.$untouched) {
  //     $scope.editDegreeErr = true;
  //   }
  // }
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
    new_user.Dob = new Date($scope.dob);
    new_user.Address = $scope.address;
    new_user.educationQualification = $scope.educationQualification;
    $scope.startIndex = 0;
    $scope.lastIndex = $scope.tableRows;
    $scope.pgNum = 1;

    return new_user;
  }

  $scope.userList = [
    {
      Name: "Ava",
      Email: "ava@patienbond.com",
      Phone: 1234567890,
      // class for the gender icon
      Image: "female",
      Age: 40,
      Dob: new Date("08/10/1980"),
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
      Age: 28,
      Dob: new Date("11/11/1992"),
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
      Dob: new Date("07/10/1999"),
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
      Phone: 9287654321,
      Image: "male",
      Age: 32,
      Dob: new Date("03/01/1988"),
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
      Age: 50,
      Dob: new Date("09/10/1970"),
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
      Age: 26,
      Dob: new Date("09/04/1995"),
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
      Age: 27,
      Dob: new Date("11/04/1994"),
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
      Dob: new Date("04/01/2001"),
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
      Phone: 9876548321,
      Image: "female",
      Age: 22,
      Dob: new Date("07/08/1998"),
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
      Dob: new Date("05/03/1996"),
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
      Dob: new Date("10/07/1955"),
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
      Dob: new Date("09/08/1971"),
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
      Dob: new Date("02/09/1975"),
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
      Dob: new Date("05/11/1985"),
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
      Dob: new Date("04/07/1983"),
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
  $scope.userList = $filter("orderBy")($scope.userList, "Name");
  // console.log($scope.userList);
  charts();
  // var userLength = $scope.userList.length;
  // console.log($filter("orderBy")($scope.userList, "Dob"));

  updateData();
  // updating the data in the currentData array
  function updateData() {
    $scope.currentData = [];
    // console.log($scope.userList);
    angular.forEach($scope.userList, function (val, key) {
      if (key >= $scope.startIndex && key < $scope.lastIndex) {
        // console.log(key);
        $scope.currentData.push(val);
      }
    });
  }

  $scope.tableRows = 5;
  $scope.showRows = function (value) {
    $scope.tableRows = parseInt(value);
    $scope.pgNum = 1;
    $scope.startIndex = 0;
    $scope.lastIndex = parseInt(value);
    $scope.pages = Math.ceil($scope.userList.length / value);
    // console.log(Math.ceil($scope.userList.length / value));
    updateData();
    $scope.sortOrder = "Name";
  };
  // to go to prev page
  $scope.prev = function () {
    if ($scope.startIndex > 0) {
      $scope.startIndex = $scope.startIndex - $scope.tableRows;

      $scope.lastIndex = $scope.startIndex + $scope.tableRows;
      $scope.pgNum--;
      updateData();
    }
  };

  // to go to next page
  $scope.next = function () {
    if ($scope.lastIndex < $scope.userList.length) {
      $scope.startIndex = $scope.startIndex + $scope.tableRows;

      // console.log($scope.startIndex);

      $scope.lastIndex = $scope.lastIndex + $scope.tableRows;

      // console.log($scope.lastIndex);
      $scope.pgNum++;
      updateData();
    }
  };
  $scope.changeInstErr = function () {
    $scope.editInstErr = false;
  };
  $scope.changeStartErr = function () {
    $scope.editStartErr = false;
  };
  $scope.changeEndErr = function () {
    $scope.editEndErr = false;
  };
  $scope.changePercErr = function () {
    $scope.editPercErr = false;
  };
  $scope.changeDegErr = function () {
    $scope.editDegErr = false;
  };
  $scope.changeDegree = function () {
    $scope.degreeErr = false;
  };
  $scope.changeInst = function () {
    $scope.instituteErr = false;
  };
  $scope.changeStart = function () {
    $scope.startDateErr = false;
  };
  $scope.changeEnd = function () {
    $scope.endDateErr = false;
  };
  $scope.changePerc = function () {
    $scope.percentageErr = false;
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
  $scope.currentNumber = 0;
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
    $scope.disableDel = false;

    $scope.degreeErr = false;
    editEduErrors();
    $scope.currentNumber = wantedToAddnext.countRow + 1;
    $scope.instituteErr = false;
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
      if ($scope.educationQualification.length == 1) {
        $scope.currentNumber = 0;
      }
      eduErrors();
      // console.log($scope.currentNumber);
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
    console.log(index);
    $scope.confirmDel = function () {
      $scope.userList.splice(index, 1);

      if ($scope.userList.length % $scope.tableRows == 0) {
        $scope.pages--;
      }
      if ($scope.userList.length == 0) {
        $scope.pages = 0;
        $scope.pgNum = 0;
      }

      updateData();
      charts();
      $("#confirm").modal("hide");
    };
  };

  $scope.editUser = function (user) {
    editEduErrors();
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

      if ($scope.educationQualification.length == 1) {
        console.log("hello");
        $scope.disableDel = true;
      }
    };

    temp = $scope.userList.indexOf(user);

    // UPDATING THE VALUES
    $scope.updateBtn = function () {
      if ($scope.form.institute.$error.required) {
        $scope.editInstErr = true;
      }
      if ($scope.form.startDate.$error.required) {
        $scope.editStartErr = true;
      }
      if ($scope.form.endDate.$error.required) {
        $scope.editEndErr = true;
      }
      if ($scope.form.percentage.$error.required) {
        $scope.editPercErr = true;
      }
      if ($scope.form.dropdownMenuButton.$untouched) {
        $scope.editDegErr = true;
      }
      // console.log($scope.editInstErr);

      // console.log($scope.editStartErr);

      // console.log($scope.editEndErr);

      // console.log($scope.editPercErr);
      // console.log($scope.editDegErr);
      if (
        validations() &&
        $scope.editInstErr == false &&
        $scope.editStartErr == false &&
        $scope.editEndErr == false &&
        $scope.editPercErr == false &&
        $scope.dropdownValue != "Degree"
      ) {
        let updateUser = userHandling();
        $scope.userList.splice(temp, 1, updateUser);

        updateData();
        charts();
        emptyFields();
        $scope.sortOrder = "Name";
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

    let edu = eduValidations();
    if (validations() && edu) {
      let addNewUser = userHandling();
      $scope.userList.unshift(addNewUser);

      updateData();
      charts();
      // userLength++;
      if ($scope.userList.length / $scope.tableRows > $scope.pages) {
        $scope.pages++;
      }

      $scope.degreeErr = false;
      emptyFields();
      $scope.sortOrder = "Name";
      $("#myModal").modal("hide");
      toaster.pop("success", "Notification", "User Added Succesfully");
    }
  };

  $scope.closeBtn = function () {
    emptyFields();
    eduErrors();
    editEduErrors();
  };

  $scope.addBtn = function () {
    emptyFields();
    eduErrors();
  };

  $scope.showInfo = function (val) {
    console.log(val);
    $scope.nameInfo = val.Name;
    $scope.emailInfo = val.Email;
    $scope.phoneInfo = val.Phone;
    $scope.genderInfo = angular.uppercase(val.Image);
    $scope.ageInfo = val.Age;
    $scope.addressInfo = val.Address;
    $scope.dobInfo = val.Dob;

    $scope.selectedUser = val;
  };

  function charts() {
    $scope.labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    $scope.labelsPie = [
      "Jan: Total Users",
      "Feb: Total Users",
      "Mar: Total Users",
      "Apr: Total Users",
      "May: Total Users",
      "June: Total Users",
      "July: Total Users",
      "Aug: Total Users",
      "Sep: Total Users",
      "Oct: Total Users",
      "Nov: Total Users",
      "Dec: Total Users",
    ];
    // var monthList = [
    //   {
    //     Jan: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Feb: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Mar: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Apr: [{ Male: 0, Female: 0, Tot: 0 }],
    //     May: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Jun: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Jul: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Aug: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Sep: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Oct: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Nov: [{ Male: 0, Female: 0, Tot: 0 }],
    //     Dec: [{ Male: 0, Female: 0, Tot: 0 }],
    //   },
    // ];
    var monthList = {
      Jan: { male: 0, female: 0, tot: 0 },
      Feb: { male: 0, female: 0, tot: 0 },
      Mar: { male: 0, female: 0, tot: 0 },
      Apr: { male: 0, female: 0, tot: 0 },
      May: { male: 0, female: 0, tot: 0 },
      June: { male: 0, female: 0, tot: 0 },
      July: { male: 0, female: 0, tot: 0 },
      Aug: { male: 0, female: 0, tot: 0 },
      Sep: { male: 0, female: 0, tot: 0 },
      Oct: { male: 0, female: 0, tot: 0 },
      Nov: { male: 0, female: 0, tot: 0 },
      Dec: { male: 0, female: 0, tot: 0 },
    };

    $scope.series = ["Male", "Female", "Total"];

    for (let i = 0; i < $scope.userList.length; i++) {
      var mon = new Date($scope.userList[i].Dob);
      // console.log($scope.userList[i]);

      var month = mon.getMonth() + 1;
      var gender = $scope.userList[i].Image;

      monthList[$scope.labels[month - 1]].tot++;
      monthList[$scope.labels[month - 1]][gender]++;
      // gender == "female"
      //   ? monthList[$scope.labels[month - 1]].female++
      //   : monthList[$scope.labels[month - 1]].male++;

      month = 0;
    }

    // console.log(monthList);
    $scope.data = [
      [
        monthList.Jan.male,
        monthList.Feb.male,
        monthList.Mar.male,
        monthList.Apr.male,
        monthList.May.male,
        monthList.June.male,
        monthList.July.male,
        monthList.Aug.male,
        monthList.Sep.male,
        monthList.Oct.male,
        monthList.Nov.male,
        monthList.Dec.male,
      ],
      [
        monthList.Jan.female,
        monthList.Feb.female,
        monthList.Mar.female,
        monthList.Apr.female,
        monthList.May.female,
        monthList.June.female,
        monthList.July.female,
        monthList.Aug.female,
        monthList.Sep.female,
        monthList.Oct.female,
        monthList.Nov.female,
        monthList.Dec.female,
      ],
      [
        monthList.Jan.tot,
        monthList.Feb.tot,
        monthList.Mar.tot,
        monthList.Apr.tot,
        monthList.May.tot,
        monthList.June.tot,
        monthList.July.tot,
        monthList.Aug.tot,
        monthList.Sep.tot,
        monthList.Oct.tot,
        monthList.Nov.tot,
        monthList.Dec.tot,
      ],
    ];

    // $scope.ColorBar = ["#0000FF", "#00ff00", "#964B00"];
    $scope.ColorBar = [
      { backgroundColor: "#00ff00" },
      { backgroundColor: "#0000FF" },
      { backgroundColor: "#800000" },
    ];
    $scope.DataSetOverride = [{ yAxisID: "y-axis-1" }]; //y-axis-1 is the ID defined in scales under options.

    $scope.options = {
      legend: { display: true },
      responsive: true, // set to false to remove responsiveness. Default responsive value is true.
      scales: {
        yAxes: [
          {
            id: "y-axis-1",
            type: "linear",
            display: true,
            position: "left",
          },
        ],
      },
    };

    $scope.pieChartData = angular.copy($scope.data[2]);

    $scope.colorsPie = [
      "#90EE90",
      "#FF6600",
      "#8080FF",
      "#0000FF",
      "#00ff00",
      "#FF00FF",
      "#FF0000",
      "#00FFFF",
      "#800080",
      "#FFFF00",
      "#A52A2A",
      "#C0C0C0",
    ];

    $scope.optionsPie = {
      legend: {
        display: false,
      },
      responsive: true, // set to false to remove responsiveness. Default responsive value is true.
    };
  }
});
