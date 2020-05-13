-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2020 at 01:27 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `primewaterdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `username`, `password`, `createdDate`) VALUES
(1, 'admin', 'admin', '2020-02-15 03:25:58');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customers`
--

CREATE TABLE `tbl_customers` (
  `customerId` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL,
  `meterNo` bigint(11) NOT NULL,
  `startMeter` bigint(45) NOT NULL,
  `startDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `firstName` text NOT NULL,
  `middleName` text NOT NULL,
  `lastName` text NOT NULL,
  `gender` text NOT NULL,
  `birthDate` date NOT NULL,
  `address` varchar(45) NOT NULL,
  `locationCode` varchar(45) NOT NULL,
  `contactNo` bigint(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `status` int(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_customers`
--

INSERT INTO `tbl_customers` (`customerId`, `image`, `meterNo`, `startMeter`, `startDate`, `firstName`, `middleName`, `lastName`, `gender`, `birthDate`, `address`, `locationCode`, `contactNo`, `email`, `password`, `status`, `createdAt`) VALUES
('PW-00001', 'avatar.png', 1257772, 0, '2020-04-25 09:03:01', 'Santiee', 'Alattica', 'Pelayo', 'Male', '2003-01-09', '391 Alpha', 'CAL01', 9360628101, 'santiepelayo@gmail.com', 'test', 1, '2020-03-24 16:00:00'),
('PW-000012', 'sample', 1, 35, '2020-05-10 16:00:00', 'Santie', 'Test', 'Pelayo', 'Male', '2020-05-29', '391 Alpha', 'PW-00005', 9360628101, 'trecia@gmail.com', 'password', 1, '2020-05-11 15:24:45'),
('PW-000013', 'sdasdasdasdasd', 0, 35, '2020-05-10 16:00:00', 'Santie', 'Test', 'Pelayo', 'Male', '2020-05-29', '391 Alpha', 'PW-00005', 9360628101, 'trecia@gmail.com', 'password', 1, '2020-05-11 15:26:00'),
('PW-00003', '', 0, 0, '2020-04-27 15:39:32', 'test', 'test', 'test', 'Female', '2010-01-12', 'test', '', 936062810122, 'test@gmail.com', 'test', 1, '2020-04-27 15:39:32');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_invoices`
--

CREATE TABLE `tbl_invoices` (
  `invoiceId` int(11) NOT NULL,
  `staffId` int(11) NOT NULL,
  `customerId` varchar(45) NOT NULL,
  `previousMeter` int(11) NOT NULL,
  `presentMeter` int(11) NOT NULL,
  `billingStart` date NOT NULL,
  `billingEnd` date NOT NULL,
  `dueDate` date NOT NULL,
  `totalMeter` bigint(11) NOT NULL,
  `perCubicPrice` decimal(45,2) NOT NULL,
  `totalAmount` decimal(45,2) NOT NULL,
  `invoiceStatus` int(1) NOT NULL,
  `dateOfReading` date NOT NULL,
  `remarks` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_invoices`
--

INSERT INTO `tbl_invoices` (`invoiceId`, `staffId`, `customerId`, `previousMeter`, `presentMeter`, `billingStart`, `billingEnd`, `dueDate`, `totalMeter`, `perCubicPrice`, `totalAmount`, `invoiceStatus`, `dateOfReading`, `remarks`, `createdAt`) VALUES
(1, 1, 'PW-00001', 10, 15, '2020-04-25', '2020-05-25', '2020-03-09', 5, '100.00', '500.00', 0, '2020-04-15', 'test', '2020-04-25 08:09:59'),
(2, 1, 'PW-00001', 10, 15, '2020-04-25', '2020-05-25', '2020-03-09', 5, '100.00', '500.00', 0, '2020-04-15', 'test', '2020-04-25 08:09:59');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payments`
--

CREATE TABLE `tbl_payments` (
  `paymentId` int(12) NOT NULL,
  `customerId` varchar(45) NOT NULL,
  `invoiceId` int(12) NOT NULL,
  `staffId` int(12) NOT NULL,
  `pricePerMeter` decimal(45,2) NOT NULL,
  `discount` decimal(45,2) NOT NULL,
  `penaltyFee` decimal(45,2) NOT NULL,
  `cashReceived` decimal(45,2) NOT NULL,
  `totalBillingAmount` decimal(45,2) NOT NULL,
  `remarks` varchar(45) NOT NULL,
  `status` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_payments`
--

INSERT INTO `tbl_payments` (`paymentId`, `customerId`, `invoiceId`, `staffId`, `pricePerMeter`, `discount`, `penaltyFee`, `cashReceived`, `totalBillingAmount`, `remarks`, `status`, `createdAt`) VALUES
(4, 'PW-00001', 2, 1, '100.00', '60.00', '100.00', '600.00', '540.00', '', '1', '2020-05-02 07:19:05');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_staffs`
--

CREATE TABLE `tbl_staffs` (
  `staffId` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `userName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `birthDate` date NOT NULL,
  `address` varchar(45) NOT NULL,
  `gender` text NOT NULL,
  `contactNo` bigint(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `status` int(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_staffs`
--

INSERT INTO `tbl_staffs` (`staffId`, `image`, `firstName`, `lastName`, `userName`, `password`, `birthDate`, `address`, `gender`, `contactNo`, `email`, `status`, `createdAt`) VALUES
(1, 'ggg.jpg', 'Santie', 'Pelayo', 'test', 'test', '1997-01-23', 'test', 'Male', 936062810122, 'santie@gmail.com', 1, '2020-03-29 11:30:26');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_unitprice`
--

CREATE TABLE `tbl_unitprice` (
  `unitId` int(11) NOT NULL,
  `cubicMeter` int(45) NOT NULL,
  `cubicMeterPrice` decimal(45,2) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_unitprice`
--

INSERT INTO `tbl_unitprice` (`unitId`, `cubicMeter`, `cubicMeterPrice`, `status`) VALUES
(1, 1, '100.00', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_customers`
--
ALTER TABLE `tbl_customers`
  ADD PRIMARY KEY (`customerId`);

--
-- Indexes for table `tbl_invoices`
--
ALTER TABLE `tbl_invoices`
  ADD PRIMARY KEY (`invoiceId`);

--
-- Indexes for table `tbl_payments`
--
ALTER TABLE `tbl_payments`
  ADD PRIMARY KEY (`paymentId`);

--
-- Indexes for table `tbl_staffs`
--
ALTER TABLE `tbl_staffs`
  ADD PRIMARY KEY (`staffId`);

--
-- Indexes for table `tbl_unitprice`
--
ALTER TABLE `tbl_unitprice`
  ADD PRIMARY KEY (`unitId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_invoices`
--
ALTER TABLE `tbl_invoices`
  MODIFY `invoiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `tbl_payments`
--
ALTER TABLE `tbl_payments`
  MODIFY `paymentId` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_staffs`
--
ALTER TABLE `tbl_staffs`
  MODIFY `staffId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_unitprice`
--
ALTER TABLE `tbl_unitprice`
  MODIFY `unitId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
