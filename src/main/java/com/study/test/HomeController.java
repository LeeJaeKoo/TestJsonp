package com.study.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonGenerationException;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	
	private static String id = null;
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "home";
	}

	@RequestMapping(value = "/getJSON.json", method = RequestMethod.GET)
	public void jsonpTest(@RequestParam String callback, HttpServletRequest req, HttpServletResponse res)
			throws IOException {
		String callBack = callback;
		System.out.println(callback);
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("success", true);

		PrintWriter pw = res.getWriter();
		pw.print(callBack + "(" + jsonObj.toString() + ")");
		pw.flush();
		pw.close();

	}

	@RequestMapping(value = "/getData", method = RequestMethod.GET)
	public void getData(HttpServletRequest req, HttpServletResponse res, @RequestParam String callback)
			throws IOException {

		String callBack = callback;
		String urlStr = "http://175.125.132.121:8080/test/server/data";
		URL url = new URL(urlStr);
		URLConnection connection = url.openConnection();
		connection.setDoOutput(true);
		connection.setRequestProperty("CONTENT-TYPE", "text/html");
		BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream(), "utf-8"));
		String inputLine;
		in.readLine();
		String buffer = "";
		while ((inputLine = in.readLine()) != null) {
			buffer += inputLine.trim() + "\r\n";
		}
		System.out.println(buffer);

		JSONObject obj = new JSONObject();
		obj.put("xml", buffer);

		res.setHeader("Access-Control-Allow-Origin", "*");

		PrintWriter pw = res.getWriter();
		pw.print(callBack + "(" + obj.toString() + ")");
		pw.close();
		in.close();

	}

	@RequestMapping(value = "/jsonpTest", method = RequestMethod.GET)
	@ResponseBody
	public String jsonpTest(@RequestParam String callback) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("result1", "success1");
		paramMap.put("result2", "success2");
		paramMap.put("result3", "success3");

		String result = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			result = mapper.writeValueAsString(paramMap);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		System.out.println(result);
		return callback + "(" + result + ")";
	}

	@RequestMapping(value = "/vpaid", method = RequestMethod.GET)
	public String vpaid(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "vpaid";
	}

	@RequestMapping(value = "/client", method = RequestMethod.GET)
	public String client(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "client";
	}

	@RequestMapping(value = "/client2", method = RequestMethod.GET)
	public String client2(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "client2";
	}

	@RequestMapping(value = "/client3", method = RequestMethod.GET)
	public String client3(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "client3";
	}

	@RequestMapping(value = "/client5", method = RequestMethod.GET)
	public String client5(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "client5";
	}

	@RequestMapping(value = "/crosstest", method = RequestMethod.GET)
	public String crosstest(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "crosstest";
	}

	@RequestMapping(value = "/GameCompiled", method = RequestMethod.GET)
	public String GameCompiled(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "GameCompiled";
	}

	@RequestMapping(value = "/origin", method = RequestMethod.GET)
	public String origin(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "origin";
	}

	@RequestMapping(value = "/origin2", method = RequestMethod.GET)
	public String origin2(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "origin2";
	}
	
	@RequestMapping(value = "/server/preroll_no_skip", method = RequestMethod.GET)
	public String preroll_no_skip(HttpServletRequest req, HttpServletResponse res) {
		id = req.getParameter("mediaID");
		String screenCode = req.getParameter("screenCode");
		String adType = req.getParameter("adType");
		System.out.println("================ " + id + ", " + screenCode + ", " + adType + "==========================");
		res.setHeader("Access-Control-Allow-Origin", "*");
		return "server/preroll_no_skip";
	}

	@RequestMapping(value = "/server/preroll_skip", method = RequestMethod.GET)
	public String preroll_skip(HttpServletRequest req, HttpServletResponse res) {
		id = req.getParameter("mediaID");
		String screenCode = req.getParameter("screenCode");
		String adType = req.getParameter("adType");
		System.out.println("================ " + id + ", " + screenCode + ", " + adType + "==========================");
		res.setHeader("Access-Control-Allow-Origin", "*");
		return "server/preroll_skip";
	}

	@RequestMapping(value = "/server/postroll", method = RequestMethod.GET)
	public String postroll(HttpServletRequest req, HttpServletResponse res) {
		id = req.getParameter("mediaID");
		String screenCode = req.getParameter("screenCode");
		String adType = req.getParameter("adType");
		System.out.println("================ " + id + ", " + screenCode + ", " + adType + "==========================");
		res.setHeader("Access-Control-Allow-Origin", "*");
		return "server/postroll";
	}

	@RequestMapping(value = "/server/data", method = RequestMethod.GET)
	public String data2(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "server/data";
	}

	@RequestMapping(value = "/getJSON", method = RequestMethod.GET)
	public ModelAndView getData(@RequestParam Object data) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("origin");
		mv.addObject("xml", data);
		System.out.println(data.toString());
		return mv;
	}

	@RequestMapping(value = "/server", method = RequestMethod.GET)
	public String server(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "server1";
	}

	@RequestMapping(value = "/ajaxTest", method = RequestMethod.GET)
	public String ajaxTest(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "ajaxTest";
	}

	@RequestMapping(value = "/origin3", method = RequestMethod.GET)
	public String origin3(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "origin3";
	}

	@RequestMapping(value = "/origin4", method = RequestMethod.GET)
	public String origin4(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "origin4";
	}

	@RequestMapping(value = "/result", method = RequestMethod.GET)
	public String result(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "result";
	}

	@RequestMapping(value = "/videotest", method = RequestMethod.GET)
	public String videotest(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videotest(semi-fin)";
	}

	@RequestMapping(value = "/testVideo", method = RequestMethod.GET)
	public String testVideo(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "testVideo";
	}

	@RequestMapping(value = "/videoUI", method = RequestMethod.GET)
	public String videoUI(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videoUI";
	}

	@RequestMapping(value = "/videoclient", method = RequestMethod.GET)
	public String videoclient(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videoclient";
	}

	@RequestMapping(value = "/videoWidth", method = RequestMethod.GET)
	public String videoWidth(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videoWidth";
	}

	@RequestMapping(value = "/videolist", method = RequestMethod.GET)
	public String videolist(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videolist";
	}

	@RequestMapping(value = "/videohover", method = RequestMethod.GET)
	public String videohover(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videohover";
	}

	@RequestMapping(value = "/Before_After", method = RequestMethod.GET)
	public String Before_After(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "Before_After";
	}

	@RequestMapping(value = "/videolight", method = RequestMethod.GET)
	public String videolight(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videolight";
	}

	@RequestMapping(value = "/videoexam", method = RequestMethod.GET)
	public String videoexam(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videoexam";
	}

	@RequestMapping(value = "/videoscroll", method = RequestMethod.GET)
	public String videoscroll(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videoscroll";
	}

	@RequestMapping(value = "/videorewind", method = RequestMethod.GET)
	public String videorewind(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videorewind";
	}

	@RequestMapping(value = "/videobasic", method = RequestMethod.GET)
	public String videobasic(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "videobasic";
	}

	@RequestMapping(value = "/responsive", method = RequestMethod.GET)
	public String responsive(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "responsive";
	}

	@RequestMapping(value = "/NewFile", method = RequestMethod.GET)
	public String NewFile(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "NewFile";
	}

	@RequestMapping(value = "/basic", method = RequestMethod.GET)
	public String basic(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "basic";
	}

	@RequestMapping(value = "/rolltest", method = RequestMethod.GET)
	public String rolltest(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "rolltest";
	}

	@RequestMapping(value = "/restRate", method = RequestMethod.GET)
	public String restRate(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "restRate";
	}

	@RequestMapping(value = "/ad", method = RequestMethod.GET)
	public String ad(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "ad";
	}

	@RequestMapping(value = "/ad2", method = RequestMethod.GET)
	public String ad2(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "ad2";
	}

	@RequestMapping(value = "/progress", method = RequestMethod.GET)
	public void logDate(Locale locale, Model model) {

	}

}
