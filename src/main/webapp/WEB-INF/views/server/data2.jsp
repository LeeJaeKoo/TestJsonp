<%@ page contentType="text/html; charset=euc-kr" errorPage="DBError.jsp"%>
<%@ page import="java.sql.*"%>
<%
	String userId = request.getParameter("userId");

	String l250 = request.getParameter("L250");
	String l500 = request.getParameter("L500");
	String l1000 = request.getParameter("L1000");
	String l2000 = request.getParameter("L2000");
	String l4000 = request.getParameter("L4000");
	String l8000 = request.getParameter("L8000");

	String r250 = request.getParameter("R250");
	String r500 = request.getParameter("R500");
	String r1000 = request.getParameter("R1000");
	String r2000 = request.getParameter("R2000");
	String r4000 = request.getParameter("R4000");
	String r8000 = request.getParameter("R8000");

	Connection conn = null;
	Statement stmt = null;

	try {
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1/tracking", "root", "database");
		if (conn == null)
			throw new Exception("�����ͺ��̽��� ������ �� �����ϴ�.");
		stmt = conn.createStatement();
		String command = "INSERT INTO data (`ID`, `TITLE`, `CNT`) VALUES ('AD1', 'skip', '3');";
		int rowNum = stmt.executeUpdate(command);
		if (rowNum < 1)
			throw new Exception("�����͸� DB�� �Է��� �� �����ϴ�.");
	} finally {
		try {
			stmt.close();
		} catch (Exception ignored) {
		}
		try {
			conn.close();
		} catch (Exception ignored) {
		}
	}
	response.sendRedirect("DBInputResult.jsp");
%>
