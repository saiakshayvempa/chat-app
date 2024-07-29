package handlers

import (
	
	"net/http"

	"github.com/gin-gonic/gin"
	"go-workspace/db"
)

import "fmt"

type GroupDetailRequest struct {
	ID        int    `json:"id"`
	
}
func GroupDetails(c *gin.Context) {

	var req GroupDetailRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	fmt.Println("24")
	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()
	fmt.Println("31 req.ID",req.ID)
	query := "select p.id,p.name,p.age,p.email from group_details as gd inner join people p on p.id=gd.people_id where group_id = ?"
	rows, err := dbConn.Query(query, req.ID)

	fmt.Println("34 req.ID",req.ID)
	
	if err != nil {
		fmt.Println("38 err",err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}
	defer rows.Close()

	var data []map[string]interface{}
	for rows.Next() {
		var id,age int
		var name,email string
		err := rows.Scan(&id, &name, &age, &email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read row"})
			return
		}
		data = append(data, map[string]interface{}{"id":id,"name": name, "age": age, "email": email})
	}

	if err = rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Row iteration error", "details": err.Error()})
		return
	}

	if len(data) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No data found", "data": data})
	} else {
		c.JSON(http.StatusOK, data)
	}
}



type GroupDetailsUpdateRequest struct {
	ID        int    `json:"id"`
	Name string `json:"name"`
	Age int `json:"age"`
	Amount int `json:"amount"`
}

func GroupDeatilsUpdate(c *gin.Context) {
	var req GroupDetailsUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database", "details": err.Error()})
		return
	}
	defer dbConn.Close()

	// query := "INSERT INTO logins (id, name, password) VALUES ($1, $2, $3)"
	query := "UPDATE people SET name = $2, age= $3,amount= $4 WHERE id = $1"
	result, err := dbConn.Exec(query, req.ID, req.Name, req.Age,req.Amount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}

	rowsAffected, err := result.RowsAffected()

	fmt.Println("rowsAffected",rowsAffected)


	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve rows affected", "details": err.Error()})
		return
	}

	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No rows affected, check the ID"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Group Infos updeted successfully"})
}

type DetailsDeleteRequest struct {
	ID     int    `json:"id"`
	
	
}


func GroupDeatilsDelete(c *gin.Context) {
	var req DetailsDeleteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	// query := "INSERT INTO logins (id, name, password) VALUES ($1, $2, $3)"
	query := "DELETE FROM group_details WHERE  people_id = $1"
	_, err = dbConn.Exec(query, req.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query delete from group_details"})
		return
	}

	// query := "INSERT INTO logins (id, name, password) VALUES ($1, $2, $3)"
	query_2 := "DELETE FROM people WHERE  id = $1"
	_, err = dbConn.Exec(query_2, req.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query delete from people"})
		return
	}


	c.JSON(http.StatusOK, gin.H{"message": "Group Infos updeted successfully"})
}


type DetailsInsertRequest struct {
	Name string `json:"name"`
	Age int `json:"age"`
	Amount int `json:"amount"`
	GroupId int `json:"group_id"`
}

func GroupDeatilsInsert(c *gin.Context) {
	var req DetailsInsertRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	var peopleID, groupRow int

	// Fetch existing max id from people table"
	query1 := "SELECT COALESCE(MAX(id), 0) FROM people;"
	err = dbConn.QueryRow(query1).Scan(&peopleID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch max id from people table", "details": err.Error()})
		return
	}
	peopleID++

	fmt.Println("peopleID",peopleID)

	// query := "INSERT INTO people Table (id, name, password) VALUES ($1, $2, $3)"
	query_2 := "INSERT INTO people (id, name, age, amount) VALUES ($1, $2, $3,$4);"
	_, err = dbConn.Exec(query_2, peopleID, req.Name, req.Age,req.Amount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query in people"})
		return
	}
	fmt.Println("peopleID",peopleID)

	// Fetch existing max id from group details table"
	query3 := "SELECT COALESCE(MAX(id), 0) FROM group_details;"
	err = dbConn.QueryRow(query3).Scan(&groupRow)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch max id from group_details table", "details": err.Error()})
		return
	}
	groupRow++

	fmt.Println("people_id",groupRow)

	// query := "INSERT INTO group details Table (id, name, password) VALUES ($1, $2, $3)"
	query_4 := "INSERT INTO group_details (id, group_id, people_id) VALUES ($1, $2, $3);"
	_, err = dbConn.Exec(query_4, groupRow,req.GroupId, peopleID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query in group details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Group Infos updeted successfully"})
}


type FetchGroupRequest struct {
	ID        int    `json:"id"`
	
}
func FetchGroupDetails(c *gin.Context) {

	var req FetchGroupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	fmt.Println("236")
	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()
	fmt.Println("243")
	query := "SELECT p.id, p.name, p.age, p.email FROM people p where p.id not in (select people_id from group_details where group_id=?);"
	rows, err := dbConn.Query(query, req.ID)
	fmt.Println("246")
	if err != nil {
		fmt.Println("err",err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}
	defer rows.Close()
	fmt.Println("253")
	var data []map[string]interface{}
	for rows.Next() {
		var id,age int
		var name,email string
		err := rows.Scan(&id, &name, &age, &email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read row"})
			return
		}
		data = append(data, map[string]interface{}{"id":id,"name": name, "age": age, "email": email})
	}

	if err = rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Row iteration error", "details": err.Error()})
		return
	}

	if len(data) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No data found", "data": data})
	} else {
		c.JSON(http.StatusOK, data)
	}
}


type AddPeopleRequest struct {
	ID int `json:"id"`
	GroupId int `json:"group_id"`
	Age int `json:"age"`
	Name string `json:"name"`
	Email int `json:"email"`
}

func AddPeopleInsert (c *gin.Context) {
	fmt.Println("293")
	var req AddPeopleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	fmt.Println("293")
	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	fmt.Println("301")
	fmt.Println(" req.GroupId, req.ID", req.GroupId, req.ID)
	// query := "INSERT INTO group_details (name, password) VALUES (?,?)"
	query_2 := "INSERT INTO group_details ( group_id, people_id) VALUES (?,?);"
	_, err = dbConn.Exec(query_2, req.GroupId, req.ID)
	if err != nil {
		fmt.Println("307 err",err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query in people"})
		return
	}
	fmt.Println("311")


	c.JSON(http.StatusOK, gin.H{"message": "Group Infos updeted successfully"})
}


type RemovePeopleRequest struct {
	ID int `json:"id"`
	GroupId int `json:"group_id"`
	Age int `json:"age"`
	Name string `json:"name"`
	Amount int `json:"amount"`
}

func RemovePeople (c *gin.Context) {
	var req RemovePeopleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	var rowID int

	
	// query := "Delete INTO group_details Table (id, name, password) VALUES ($1, $2, $3)"
	query := "DELETE FROM group_details WHERE group_id=$1 and people_id=$2;"
	_, err = dbConn.Exec(query,  req.GroupId, req.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query in people"})
		return
	}
	fmt.Println("peopleID",rowID)

	

	c.JSON(http.StatusOK, gin.H{"message": "Group Infos updeted successfully"})
}
